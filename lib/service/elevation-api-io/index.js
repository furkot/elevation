module.exports = init;

// see: https://elevation-api.io/

function abort() {
}

const MAX_POINTS = 10;

/* global URLSearchParams */

function convert({ elevation }) {
  return elevation;
}

function flattenTo(array, result) {
  return array.reduce((result, a) => {
    result.push(...a.map(convert));
    return result;
  }, result);
}

function fetchElevations(from, points, key) {
  const to = Math.min(points.length, from + MAX_POINTS);
  let pointsParam = [];
  for(let i = from; i < to; i++) {
    let ll = points[i];
    pointsParam.push(`(${ll[1]},${ll[0]})`);
  }
  const params = new URLSearchParams({
    points: pointsParam.join(','),
  });
  if (key) {
    params.set('key', key);
  }
  return fetch(`https://elevation-api.io/api/elevation?${params.toString()}`)
    .then(res => res.json())
    .then(body => body.elevations);
}

function init({ key }) {

  function query(queryId, points, result, fn) {
    const requests = [];
    for(let i = 0; i < points.length; i += 10) {
      requests.push(fetchElevations(i, points, key));
    }
    Promise.all(requests)
      .catch(err => fn(err)) // TODO: convert error/status
      .then(elevations => flattenTo(elevations, result))
      .then(result => fn(null, true, queryId, points, result));
  }

  return { query, abort };
}
