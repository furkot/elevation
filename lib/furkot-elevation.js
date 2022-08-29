const grade = require('./grade');

module.exports = furkotElevation;

const defaultTimeout = 20 * 1000;

const services = {
  'elevation-api-io': require('./service/elevation-api-io'),
  'open-elevation': require('./service/open-elevation'),
  tatry: require('./service/tatry'),
  valhalla: require('./service/valhalla'),
  random: require('./service/random')
};

function furkotElevation(options) {

  options = Object.assign({
    timeout: defaultTimeout,
    order: ['random']
  }, options);

  const { operations, aborts } = getOperations(options);
  return elevation;

  async function elevation(points, { signal } = {}) {
    let aborted;

    if (signal) {
      signal.onabort = abort;
    }

    return withTimeout(request(points), options.timeout);

    async function request(points) {
      if (!points.length) {
        return;
      }

      const stats = [];
      for (const operation of operations) {
        stats.push(operation.provider);
        const result = await operation(points);
        signal?.throwIfAborted();
        if (result) {
          result.stats = stats;
          return result;
        }
      }
    }

    function abort() {
      if (aborted) {
        return;
      }
      aborted = true;
      // cancel outstanding requests
      aborts.forEach(abort => abort?.());
    }
  }
}

function getOperations(options) {
  const { order } = options;

  const operations = [];
  const aborts = [];
  const operationTimeout = 0.8 * options.timeout;

  order.forEach(name => {
    const enable = options[`${name}_enable`];
    if (!enable) {
      return;
    }

    const service = services[options[name] || name];
    if (!service) {
      return;
    }

    const initOptions = pluckOptionsFor(options, name);
    const { query, abort } = service(initOptions);
    const { parameters } = initOptions;
    const accuracy = parameters?.accuracy;

    operations.push(operation);
    operation.provider = name;
    aborts.push(abort);

    async function operation(points) {
      try {
        const result = await withTimeout(query(points), operationTimeout);
        result.provider = name;
        result.points = points;
        if (points.smooth && accuracy) {
          grade(result, accuracy);
        }
        return result;
      } catch (e) {
        if (e.cause === Symbol.for('timeout')) {
          abort?.();
        }
      }
    }
  });

  return { operations, aborts };
}

function pluckOptionsFor(options, name) {
  const result = { name };
  const prefix = `${name}_`;
  Object.keys(options).forEach(key => {
    if (key.startsWith(prefix)) {
      const suffix = key.slice(prefix.length);
      result[suffix] = options[key];
    }
  });
  return result;
}

function withTimeout(promise, timeout) {
  let id;
  return Promise
    .race([promise, new Promise(timeoutPromise)])
    .finally(() => clearTimeout(id));

  function timeoutPromise(_, reject) {
    id = setTimeout(
      () => reject(Error('timeout', { cause: Symbol.for('timeout') })),
      timeout
    );
  }
}
