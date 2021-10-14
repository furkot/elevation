const fetchagent = require('fetchagent');

module.exports = init;

function abort() {
}

function fetchElevationsGet(url, points) {
  const lls = points.map(ll => ll.join(',')).join('|');
  return fetchagent
    .get(url)
    .query({ lls });
}

function fetchElevationsPost(url, lls) {
  return fetchagent
    .post(url)
    .send({ lls });
}

function init({ url, parameters: { get_limit = 1000 } = {}}) {

  const serviceUrl = `${url}/api/v2/lookup`;

  function query(queryId, points, result, fn) {
    const fetchElevations = points.length > get_limit ? fetchElevationsPost : fetchElevationsGet;

    return fetchElevations(serviceUrl, points)
      .json()
      .then(
        result => fn(null, true, queryId, points, result.results),
        () => fn(null, false, queryId, points, result) // pass to the next service
      );
  }

  return { query, abort };
}
