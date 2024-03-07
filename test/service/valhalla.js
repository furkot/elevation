const { describe, it } = require('node:test');
const valhallaElevation = require('../../lib/service/valhalla');

const VALHALLA_URL = process.env.VALHALLA_URL || 'https://api.stadiamaps.com';
const VALHALLA_KEY = process.env.VALHALLA_KEY || 'test'; // key valid for replay only

describe('valhalla elevation service', async function () {

  await it('should fetch elevation for 4 points', async function () {
    const points = [
      [-106.827126, 40.483468],
      [-106.1, 40.5],
      [-106.9, 40.8]
    ];
    const { query } = valhallaElevation({
      name: 'valhalla',
      url: VALHALLA_URL,
      key: VALHALLA_KEY,
      enable: true
    });

    const result = await query(points);
    result.should.eql([
      { ll: [-106.827126, 40.483468], elevation: 2061 },
      { ll: [-106.1, 40.5], elevation: 3039 },
      { ll: [-106.9, 40.8], elevation: 2489 }
    ]);
  });

  await it('should fetch elevation using post if over the get_limit', async function () {
    const points = [
      [-106.827126, 40.483468],
      [-106.1, 40.5],
      [-106.9, 40.8]
    ];
    const { query } = valhallaElevation({
      name: 'valhalla',
      url: VALHALLA_URL,
      key: VALHALLA_KEY,
      parameters: {
        get_limit: 2
      },
      enable: true
    });

    const result = await query(points);
    result.should.eql([
      { ll: [-106.827126, 40.483468], elevation: 2061 },
      { ll: [-106.1, 40.5], elevation: 3039 },
      { ll: [-106.9, 40.8], elevation: 2489 }
    ]);
  });
});
