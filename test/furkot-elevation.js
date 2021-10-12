const should = require('should');
const furkotElevation = require('../');

describe('furkot elevation', function () {

  it('uses random service by default', function (done) {
    const points = [ [ 0, 0 ], [ 1, 1 ] ];
    const elevation = furkotElevation({
      random_enable: true
    });
    elevation(points, (result) => {
      should.exist(result);
      result.should.have.length(points.length);
      done();
    });
  });

  it('invoke callback on timeout', function (done) {
    const points = [ [ 0, 0 ], [ 1, 1 ] ];
    const elevation = furkotElevation({
      timeout: 10,
      random_parameters: {
        timeout: 100000
      },
      random_enable: true
    });
    elevation(points, (result) => {
      should.not.exist(result);
      done();
    });
  });

  it('timeout first service', function (done) {
    const points = [ [ 0, 0 ], [ 1, 1 ] ];
    const elevation = furkotElevation({
      timeout: 100,
      order: [ 'timeout_random', 'success_random' ],
      timeout_random: 'random',
      timeout_random_parameters: {
        timeout: 200
      },
      timeout_random_enable: true,
      success_random: 'random',
      success_random_enable: true
    });
    elevation(points, (result) => {
      should.exist(result);
      result.should.have.length(points.length);
      result.provider.should.equal('success_random');
      done();
    });
  });
});
