const should = require('should');
const elevationApiIo = require('../../lib/service/elevation-api-io');

describe('elevation API io', function () {

  it('should fetch elevation for 2 points', function (done) {
    const points = [
      [ -106.17188, 39.90974 ],
      [ 10.02487, 62.52417 ]
    ];
    const { query } = elevationApiIo({
      name: 'elevation-api-io',
      enable: true
    });

    query(111, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(111);
      result.should.eql([ 2607, 96 ]);
      done();
    });
  });

  it('should split request if needed', function (done) {
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
    const { query } = elevationApiIo({
      name: 'elevation-api-io',
      enable: true
    });

    query(112, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(112);
      result.should.eql([
        2282,
        2281.5,
        2128,
        2140,
        2029,
        1916.5,
        1860.5,
        1857,
        1855.5,
        1838,
        1770.5,
        1797.5,
        1770,
        1767,
        1721.5,
        1664.5,
        1643.5,
        1590,
        1670.5,
        1478,
        1425,
        1396
      ]);
      done();
    });
  });

});
