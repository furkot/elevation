const should = require('should');
const valhallaElevation = require('../../lib/service/valhalla');

const VALHALLA_URL = process.env.VALHALLA_URL || 'https://api.stadiamaps.com';
const VALHALLA_KEY = process.env.VALHALLA_KEY || 'test'; // key valid for replay only

describe('valhalla elevation service', function () {

  it('should fetch elevation for 4 points', function () {
    const points = [
      [ -106.827126, 40.483468 ],
      [ -106.1, 40.5 ],
      [ -106.9, 40.8 ]
    ];
    const { query } = valhallaElevation({
      name: 'valhalla',
      url: VALHALLA_URL,
      key: VALHALLA_KEY,
      enable: true
    });

    return query(111, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(111);
      result.should.eql([
        { ll: [ -106.827126, 40.483468 ], elevation: 2061 },
        { ll: [ -106.1, 40.5 ], elevation: 3039 },
        { ll: [ -106.9, 40.8 ], elevation: 2489 }
      ]);
    });
  });

  it('should fetch elevation using post if over the get_limit', function () {
    const points = [
      [ -106.827126, 40.483468 ],
      [ -106.1, 40.5 ],
      [ -106.9, 40.8 ]
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

    return query(112, points, [], (err, completed, queryId, points, result) => {
      should.not.exist(err);
      completed.should.be.ok();
      queryId.should.eql(112);
      result.should.eql([
        { ll: [ -106.827126, 40.483468 ], elevation: 2061 },
        { ll: [ -106.1, 40.5 ], elevation: 3039 },
        { ll: [ -106.9, 40.8 ], elevation: 2489 }
      ]);
    });
  });
});