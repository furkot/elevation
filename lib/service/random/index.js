module.exports = init;

function query(queryId, points, result, fn) {
  for (let i = 0; i < points.length; i++) {
    result[i] = {
        ll: points[i],
        elevation: Math.round(Math.random() * 1000)
    };
  }
  setTimeout(() => fn(null, true, queryId, points, result), 0);
}

function abort() {
}

function init() {
  return { query, abort };
}
