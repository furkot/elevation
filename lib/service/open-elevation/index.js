const fetchagent = require('fetchagent');

module.exports = init;

// see: https://github.com/Jorl17/open-elevation/blob/master/docs/api.md

// max number of points we can send as a GET request
const GET_LIMIT = 20;

function abort() {
}

function convert({ latitude, longitude, elevation }) {
  return {
    ll: [longitude, latitude],
    elevation
  };
}

function fetchElevationsGet(url, points) {
  const locations = points.map(ll => `${ll[1]},${ll[0]}`).join('|');
  return fetchagent
    .get(url)
    .query({ locations });
}


function fetchElevationsPost(url, points) {
  const locations = points.map(ll => {
    return { longitude: ll[0], latitude: ll[1] };
  });
  return fetchagent
    .post(url)
    .send({ locations });
}

function init({ host }) {

  const url = `${host}/api/v1/lookup`;

  function query(queryId, points, result, fn) {
    const fetchElevations = points.length > GET_LIMIT ? fetchElevationsPost : fetchElevationsGet;

    return fetchElevations(url, points)
      .json()
      .catch(err => fn(err)) // TODO: convert error/status
      .then(({ results = [] }) => results.map(convert))
      .then(result => fn(null, true, queryId, points, result));
  }

  return { query, abort };
}
