const should = require('should');
const openElevation = require('../../lib/service/open-elevation');

const OPEN_ELEVATION_HOST = process.env.OPEN_ELEVATION_HOST || 'https://open-elevation.com';

describe('open elevation', function () {

  it('should fetch elevation for 2 points', function () {
    const points = [
      [ -106.17188, 39.90974 ],
      [ 10.02487, 62.52417 ]
    ];
    const { query } = openElevation({
      name: 'open-elevation',
      host: OPEN_ELEVATION_HOST,
      enable: true
    });

    return query(111, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(111);
      result.should.eql([
        { ll: [ -106.17188, 39.90974 ], elevation: 2639 },
        { ll: [ 10.02487, 62.52417 ], elevation: 49 }
      ]);
    });
  });

  it('should split request if needed', function () {
    const points = [
      [ -111.393860, 45.288340 ],
      [ -111.375380, 45.287850 ],
      [ -111.357000, 45.282710 ],
      [ -111.340820, 45.276760 ],
      [ -111.326650, 45.269390 ],
      [ -111.305930, 45.261440 ],
      [ -111.266330, 45.266360 ],
      [ -111.241830, 45.272350 ],
      [ -111.220510, 45.287910 ],
      [ -111.196640, 45.306230 ],
      [ -111.170600, 45.340190 ],
      [ -111.174720, 45.365400 ],
      [ -111.179240, 45.379710 ],
      [ -111.199900, 45.390370 ],
      [ -111.221560, 45.407190 ],
      [ -111.233110, 45.436190 ],
      [ -111.256380, 45.464960 ],
      [ -111.272480, 45.492400 ],
      [ -111.251400, 45.521200 ],
      [ -111.196950, 45.616960 ],
      [ -111.185760, 45.686890 ],
      [ -111.206000, 45.722170 ]
    ];
    const { query } = openElevation({
      name: 'open-elevation',
      host: OPEN_ELEVATION_HOST,
      enable: true
    });

    return query(112, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(112);
      result.should.eql([
        { ll: [ -111.393860, 45.288340 ], elevation: 2267 },
        { ll: [ -111.375380, 45.287850 ], elevation: 2246 },
        { ll: [ -111.357000, 45.282710 ], elevation: 2167 },
        { ll: [ -111.340820, 45.276760 ], elevation: 2087 },
        { ll: [ -111.326650, 45.269390 ], elevation: 1997 },
        { ll: [ -111.305930, 45.261440 ], elevation: 1917 },
        { ll: [ -111.266330, 45.266360 ], elevation: 1841 },
        { ll: [ -111.241830, 45.272350 ], elevation: 1827 },
        { ll: [ -111.220510, 45.287910 ], elevation: 1809 },
        { ll: [ -111.196640, 45.306230 ], elevation: 1787 },
        { ll: [ -111.170600, 45.340190 ], elevation: 1793 },
        { ll: [ -111.174720, 45.365400 ], elevation: 1777 },
        { ll: [ -111.179240, 45.379710 ], elevation: 1725 },
        { ll: [ -111.199900, 45.390370 ], elevation: 1717 },
        { ll: [ -111.221560, 45.407190 ], elevation: 1688 },
        { ll: [ -111.233110, 45.436190 ], elevation: 1645 },
        { ll: [ -111.256380, 45.464960 ], elevation: 1614 },
        { ll: [ -111.272480, 45.492400 ], elevation: 1588 },
        { ll: [ -111.251400, 45.521200 ], elevation: 1567 },
        { ll: [ -111.196950, 45.616960 ], elevation: 1478 },
        { ll: [ -111.185760, 45.686890 ], elevation: 1428 },
        { ll: [ -111.206000, 45.722170 ], elevation: 1400 }
      ]);
    });
  });

});
