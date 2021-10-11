module.exports = init;

function init({ parameters: { timeout = 0 } = {} }) {

  let timeoutId;

  function query(queryId, points, result, fn) {
    for (let i = 0; i < points.length; i++) {
      result[i] = {
          ll: points[i],
          elevation: Math.round(Math.random() * 1000)
      };
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(null, true, queryId, points, result);
    }, timeout);
  }

  function abort() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }

  return { query, abort };
}
