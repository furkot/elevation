const should = require('should');
const openElevation = require('../../lib/service/tatry');

const TATRY_URL = process.env.TATRY_URL || 'http://elevation.tatry.com:3080';

describe('tatry', function () {

  it('should fetch elevation for 3 points', function () {
    const points = [
      [ -106.827126, 40.483468 ],
      [ -106.1, 40.5 ]
    ];
    const { query } = openElevation({
      name: 'tatry',
      url: TATRY_URL,
      enable: true
    });

    return query(111, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(111);
      result.should.eql([
        { ll: [ -106.827126, 40.483468 ], elevation: 2082.5 },
        { ll: [ -106.1, 40.5 ], elevation: 3065 }
      ]);
    });
  });

  it('should fetch elevation using post if over the get_limit', function () {
    const points = [
      [ -106.827126, 40.483468 ],
      [ -106.1, 40.5 ],
      [ -106.9, 40.8 ]
    ];
    const { query } = openElevation({
      name: 'tatry',
      url: TATRY_URL,
      parameters: {
        get_limit: 2
      },
      enable: true
    });

    return query(112, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(112);
      result.should.eql([
        { ll: [ -106.827126, 40.483468 ], elevation: 2082.5 },
        { ll: [ -106.1, 40.5 ], elevation: 3065 },
        { ll: [ -106.9, 40.8 ], elevation: 2474 },
      ]);
    });
  });

});
