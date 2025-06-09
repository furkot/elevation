const fetchagent = require('fetchagent');

module.exports = init;

// see: https://elevation-api.io/

const MAX_POINTS = 10;

function convert({ lat, lon, elevation }) {
  return {
    ll: [lon, lat],
    elevation
  };
}

function flattenTo(array, result) {
  return array.reduce((result, a) => {
    result.push(...a.map(convert));
    return result;
  }, result);
}

function fetchElevations(from, points, key) {
  const to = Math.min(points.length, from + MAX_POINTS);
  const pointsParam = [];
  for (let i = from; i < to; i++) {
    const ll = points[i];
    pointsParam.push(`(${ll[1]},${ll[0]})`);
  }
  const query = {
    points: pointsParam
  };
  if (key) {
    query.key = key;
  }
  return fetchagent
    .get('https://elevation-api.io/api/elevation')
    .query(query)
    .json()
    .then(body => body.elevations);
}

function init({ key }) {
  async function query(points) {
    const requests = [];
    for (let i = 0; i < points.length; i += MAX_POINTS) {
      requests.push(fetchElevations(i, points, key));
    }
    const elevations = await Promise.all(requests);
    return flattenTo(elevations, []);
  }

  return { query };
}
