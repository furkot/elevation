const { describe, it } = require('node:test');
const elevationApiIo = require('../../lib/service/elevation-api-io');

describe('elevation API io', async () => {
  await it('should fetch elevation for 2 points', async () => {
    const points = [
      [-106.17188, 39.90974],
      [10.02487, 62.52417]
    ];
    const { query } = elevationApiIo({
      name: 'elevation-api-io',
      enable: true
    });

    const result = await query(points);
    result.should.eql([
      {
        ll: [-106.17188, 39.90974],
        elevation: 2607
      },
      {
        ll: [10.02487, 62.52417],
        elevation: 96
      }
    ]);
  });

  await it('should split request if needed', async () => {
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
    const { query } = elevationApiIo({
      name: 'elevation-api-io',
      enable: true
    });

    const result = await query(points);
    result.should.eql(
      [
        2282, 2281.5, 2128, 2140, 2029, 1916.5, 1860.5, 1857, 1855.5, 1838, 1770.5, 1797.5, 1770, 1767, 1721.5, 1664.5,
        1643.5, 1590, 1670.5, 1478, 1425, 1396
      ].map((elevation, i) => ({
        ll: points[i],
        elevation
      }))
    );
  });
});
