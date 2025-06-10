import fetchagent from 'fetchagent';

// see: https://github.com/Jorl17/open-elevation/blob/master/docs/api.md

// max number of points we can send as a GET request
const GET_LIMIT = 20;

function convert({ latitude, longitude, elevation }) {
  return {
    ll: [longitude, latitude],
    elevation
  };
}

function fetchElevationsGet(url, points) {
  const locations = points.map(ll => `${ll[1]},${ll[0]}`).join('|');
  return fetchagent.get(url).query({ locations });
}

function fetchElevationsPost(url, points) {
  const locations = points.map(ll => ({
    longitude: ll[0],
    latitude: ll[1]
  }));
  return fetchagent.post(url).send({ locations });
}

export default function init({ url }) {
  const serviceUrl = `${url}/api/v1/lookup`;

  async function query(points) {
    const fetchElevations = points.length > GET_LIMIT ? fetchElevationsPost : fetchElevationsGet;

    const { results } = await fetchElevations(serviceUrl, points).json();
    return results.map(convert);
  }

  return { query };
}
