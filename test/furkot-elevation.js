const should = require('should');
const furkotElevation = require('../');

/* global AbortController */

describe('furkot elevation', function () {

  it('uses random service by default', async function () {
    const points = [[0, 0], [1, 1]];
    const elevation = furkotElevation({
      random_enable: true
    });
    const result = await elevation(points);
    should.exist(result);
    result.should.have.length(points.length);
  });

  it('reject on timeout', async function () {
    const points = [[0, 0], [1, 1]];
    const elevation = furkotElevation({
      order: ['random', 'random', 'random'],
      timeout: 10,
      random_parameters: {
        timeout: 100000
      },
      random_enable: true
    });
    return elevation(points).should.be.rejectedWith(Error, { cause: Symbol.for('timeout') });
  });

  it('reject on abort', function () {
    const points = [[0, 0], [1, 1]];
    const elevation = furkotElevation({
      timeout: 25,
      random_parameters: {
        timeout: 10000
      },
      random_enable: true
    });
    const controller = new AbortController();
    setTimeout(() => controller.abort());
    return elevation(points, { signal: controller.signal }).should.be.rejectedWith(/aborted/);
  });

  it('timeout first service', async function () {
    const points = [[0, 0], [1, 1]];
    const elevation = furkotElevation({
      timeout: 50,
      order: ['timeout_random', 'success_random'],
      timeout_random: 'random',
      timeout_random_parameters: {
        timeout: 200
      },
      timeout_random_enable: true,
      success_random: 'random',
      success_random_enable: true
    });
    const result = await elevation(points);
    should.exist(result);
    result.should.have.length(points.length);
    result.provider.should.equal('success_random');
  });
});
