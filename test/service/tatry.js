const { describe, it } = require('node:test');
const openElevation = require('../../lib/service/tatry');

const TATRY_URL = process.env.TATRY_URL || 'http://elevation.tatry.com:3080';

describe('tatry', async () => {
  await it('should fetch elevation for 3 points', async () => {
    const points = [
      [-106.827126, 40.483468],
      [-106.1, 40.5]
    ];
    const { query } = openElevation({
      name: 'tatry',
      url: TATRY_URL,
      enable: true
    });

    const result = await query(points);
    result.should.eql([
      { ll: [-106.827126, 40.483468], elevation: 2082.5 },
      { ll: [-106.1, 40.5], elevation: 3065 }
    ]);
  });

  await it('should fetch elevation using post if over the get_limit', async () => {
    const points = [
      [-106.827126, 40.483468],
      [-106.1, 40.5],
      [-106.9, 40.8]
    ];
    const { query } = openElevation({
      name: 'tatry',
      url: TATRY_URL,
      parameters: {
        get_limit: 2
      },
      enable: true
    });

    const result = await query(points);
    result.should.eql([
      { ll: [-106.827126, 40.483468], elevation: 2082.5 },
      { ll: [-106.1, 40.5], elevation: 3065 },
      { ll: [-106.9, 40.8], elevation: 2474 }
    ]);
  });
});
