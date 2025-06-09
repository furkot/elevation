const { describe, it } = require('node:test');
const should = require('should');
const furkotElevation = require('../lib/furkot-elevation');

/* global AbortController */

describe('furkot elevation', async () => {
  await it('uses random service by default', async () => {
    const points = [
      [0, 0],
      [1, 1]
    ];
    const elevation = furkotElevation({
      random_enable: true
    });
    const result = await elevation(points);
    should.exist(result);
    result.should.have.length(points.length);
  });

  await it('reject on timeout', async () => {
    const points = [
      [0, 0],
      [1, 1]
    ];
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

  await it('reject on abort', () => {
    const points = [
      [0, 0],
      [1, 1]
    ];
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

  await it('timeout first service', async () => {
    const points = [
      [0, 0],
      [1, 1]
    ];
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
