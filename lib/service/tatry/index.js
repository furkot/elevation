const fetchagent = require('fetchagent');

module.exports = init;

function fetchElevationsGet(url, points) {
  const lls = points.map(ll => ll.join(',')).join('|');
  return fetchagent.get(url).query({ lls });
}

function fetchElevationsPost(url, lls) {
  return fetchagent.post(url).send({ lls });
}

function init({ url, parameters: { get_limit = 1000 } = {} }) {
  const serviceUrl = `${url}/api/v2/lookup`;

  async function query(points) {
    const fetchElevations = points.length > get_limit ? fetchElevationsPost : fetchElevationsGet;

    const { results } = await fetchElevations(serviceUrl, points).json();
    return results;
  }

  return { query };
}
