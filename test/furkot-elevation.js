import test from 'node:test';
import furkotElevation from '../lib/furkot-elevation.js';

/* global AbortController */

test('furkot elevation', async t => {
  await t.test('uses random service by default', async t => {
    const points = [
      [0, 0],
      [1, 1]
    ];
    const elevation = furkotElevation({
      random_enable: true
    });
    const result = await elevation(points);
    t.assert.ok(result);
    t.assert.equal(result.length, points.length);
  });

  await t.test('reject on timeout', async t => {
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
    await t.assert.rejects(elevation(points), { cause: Symbol.for('timeout') });
  });

  await t.test('reject on abort', async t => {
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
    await t.assert.rejects(elevation(points, { signal: controller.signal }), /aborted/);
  });

  await t.test('timeout first service', async t => {
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
    t.assert.ok(result);
    t.assert.equal(result.length, points.length);
    t.assert.equal(result.provider, 'success_random');
  });
});
