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

});
