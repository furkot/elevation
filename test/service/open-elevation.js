import test from 'node:test';
import openElevation from '../../lib/service/open-elevation/index.js';

const OPEN_ELEVATION_URL = process.env.OPEN_ELEVATION_URL || 'https://open-elevation.com';

test('open elevation', async t => {
  await t.test('should fetch elevation for 2 points', async t => {
    const points = [
      [-106.17188, 39.90974],
      [10.02487, 62.52417]
    ];
    const { query } = openElevation({
      name: 'open-elevation',
      url: OPEN_ELEVATION_URL,
      enable: true
    });

    const result = await query(points);
    t.assert.deepEqual(result, [
      { ll: [-106.17188, 39.90974], elevation: 2639 },
      { ll: [10.02487, 62.52417], elevation: 49 }
    ]);
  });

  await t.test('should split request if needed', async t => {
    const points = [
      [-111.39386, 45.28834],
      [-111.37538, 45.28785],
      [-111.357, 45.28271],
      [-111.34082, 45.27676],
      [-111.32665, 45.26939],
      [-111.30593, 45.26144],
      [-111.26633, 45.26636],
      [-111.24183, 45.27235],
      [-111.22051, 45.28791],
      [-111.19664, 45.30623],
      [-111.1706, 45.34019],
      [-111.17472, 45.3654],
      [-111.17924, 45.37971],
      [-111.1999, 45.39037],
      [-111.22156, 45.40719],
      [-111.23311, 45.43619],
      [-111.25638, 45.46496],
      [-111.27248, 45.4924],
      [-111.2514, 45.5212],
      [-111.19695, 45.61696],
      [-111.18576, 45.68689],
      [-111.206, 45.72217]
    ];
    const { query } = openElevation({
      name: 'open-elevation',
      url: OPEN_ELEVATION_URL,
      enable: true
    });

    const result = await query(points);
    t.assert.deepEqual(result, [
      { ll: [-111.39386, 45.28834], elevation: 2267 },
      { ll: [-111.37538, 45.28785], elevation: 2246 },
      { ll: [-111.357, 45.28271], elevation: 2167 },
      { ll: [-111.34082, 45.27676], elevation: 2087 },
      { ll: [-111.32665, 45.26939], elevation: 1997 },
      { ll: [-111.30593, 45.26144], elevation: 1917 },
      { ll: [-111.26633, 45.26636], elevation: 1841 },
      { ll: [-111.24183, 45.27235], elevation: 1827 },
      { ll: [-111.22051, 45.28791], elevation: 1809 },
      { ll: [-111.19664, 45.30623], elevation: 1787 },
      { ll: [-111.1706, 45.34019], elevation: 1793 },
      { ll: [-111.17472, 45.3654], elevation: 1777 },
      { ll: [-111.17924, 45.37971], elevation: 1725 },
      { ll: [-111.1999, 45.39037], elevation: 1717 },
      { ll: [-111.22156, 45.40719], elevation: 1688 },
      { ll: [-111.23311, 45.43619], elevation: 1645 },
      { ll: [-111.25638, 45.46496], elevation: 1614 },
      { ll: [-111.27248, 45.4924], elevation: 1588 },
      { ll: [-111.2514, 45.5212], elevation: 1567 },
      { ll: [-111.19695, 45.61696], elevation: 1478 },
      { ll: [-111.18576, 45.68689], elevation: 1428 },
      { ll: [-111.206, 45.72217], elevation: 1400 }
    ]);
  });
});
