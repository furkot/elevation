const runWaterfallUntil = require('run-waterfall-until');

module.exports = furkotElevation;

const defaultTimeout = 20 * 1000;
let id = 0;

const services = {
  'elevation-api-io': require('./service/elevation-api-io'),
  'open-elevation': require('./service/open-elevation'),
  random: require('./service/random')
};

function getOperations(options) {
  const { order } = options;

  const operations = [];
  const aborts = [];

  order.forEach(name => {
    const enable = options[`${name}_enable`];
    if (!enable) {
      return;
    }

    const service = services[name];
    if (!service) {
      return;
    }

    const initOptions = pluckOptionsFor(options, name);
    const { query, abort } = service(initOptions);

    operations.push((queryId, points, result, fn) => {
      if (result) {
        result.stats = result.stats || [];
        result.stats.push(name);
      }
      query(queryId, points, result, function (err, end, queryId, points, result) {
        if (!err && result) {
          result.provider = name;
          result.points = points;
        }
        fn(null, end, queryId, points, result);
      });
    });
    aborts.push(abort);
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

function furkotElevation(options) {

  options = Object.assign({
    timeout: defaultTimeout,
    order: [ 'random' ]
  }, options);

  const { operations, aborts } = getOperations(options);

  return function elevation(points, fn) {
    let aborted;

    if (!points.length) {
      fn();
      return;
    }

    id += 1;

    const queryId = id;
    let timeoutId = setTimeout(abort, options.timeout);

    runWaterfallUntil(operations, queryId, points, [], (err, queryId, points, result) => {
      cancelTimeout();
      if (aborted) {
        return;
      }
      if (err) {
        return fn();
      }
      fn(result);
    });

    return { abort };

    function abort() {
      if (aborted) {
        return;
      }
      aborted = true;
      cancelTimeout();
      // cancel outstanding requests
      aborts.forEach(abort => abort(queryId));
    }

    function cancelTimeout() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    }
  };
}
