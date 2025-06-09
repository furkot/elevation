const test = require('node:test');
const openElevation = require('../../lib/service/tatry');

const TATRY_URL = process.env.TATRY_URL || 'http://elevation.tatry.com:3080';

test('tatry', async t => {
  await t.test('should fetch elevation for 3 points', async t => {
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
    t.assert.deepEqual(result, [
      { ll: [-106.827126, 40.483468], elevation: 2082.5 },
      { ll: [-106.1, 40.5], elevation: 3065 }
    ]);
  });

  await t.test('should fetch elevation using post if over the get_limit', async t => {
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
    t.assert.deepEqual(result, [
      { ll: [-106.827126, 40.483468], elevation: 2082.5 },
      { ll: [-106.1, 40.5], elevation: 3065 },
      { ll: [-106.9, 40.8], elevation: 2474 }
    ]);
  });
});
