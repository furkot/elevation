const fetchagent = require('fetchagent');

module.exports = init;

// see: https://valhalla.readthedocs.io/en/latest/api/elevation/api-reference/

function abort() {
}

function flattenTo(height, points, result) {
  result.push(...height.map((elevation, i) => {
    return {
      ll: points[i],
      elevation
    };
  }));
  return result;
}

function fetchElevationsGet(url, query, api_key) {
  return fetchagent
    .get(url)
    .query({
      json: JSON.stringify(query),
      api_key
    });
}

function fetchElevationsPost(url, query, key) {
  return fetchagent
    .post(`${url}?api_key=${key}`)
    .send(JSON.stringify(query));
}

function init({ url, key, parameters: { get_limit = 150 } = {} }) {

  const serviceUrl = `${url}/height`;

  function query(queryId, points, result, fn) {
    const fetchElevations = points.length > get_limit ? fetchElevationsPost : fetchElevationsGet;

    return fetchElevations(serviceUrl, {
      shape: points.map(ll => {
        return {
          lat: ll[1],
          lon: ll[0]
        };
      })
    }, key).json()
      .catch(err => fn(err)) // TODO: convert error/status
      .then(({ height }) => flattenTo(height, points, result))
      .then(result => fn(null, true, queryId, points, result));
  }

  return { query, abort };
}
