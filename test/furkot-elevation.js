const should = require('should');
const furkotElevation = require('../');

describe('furkot elevation', function () {

  it('uses random service by default', function (done) {
    const points = [ [ 0, 0 ], [ 1, 1 ] ];
    const elevation = furkotElevation({
      random_enable: true
    });
    elevation(points, (err, result) => {
      should.exist(result);
      should.not.exist(err);
      result.should.have.length(points.length);
      done();
    });
  });

});
