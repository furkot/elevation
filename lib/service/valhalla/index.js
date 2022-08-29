const fetchagent = require('fetchagent');

module.exports = init;

// see: https://valhalla.readthedocs.io/en/latest/api/elevation/api-reference/

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

  async function query(points) {
    const fetchElevations = points.length > get_limit ? fetchElevationsPost : fetchElevationsGet;

    const { height } = await fetchElevations(serviceUrl, {
      shape: points.map(ll => {
        return {
          lat: ll[1],
          lon: ll[0]
        };
      })
    }, key)
      .json();
    return flattenTo(height, points, []);
  }

  return { query };
}
