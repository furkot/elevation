import test from 'node:test';
import grade from '../lib/grade.js';

test('grade elevation', async t => {
  function roundDistance(profile) {
    return Math.round(
      profile.reduce((d, p) => {
        d += p.distance;
        p.distance = Math.round(p.distance);
        return d;
      }, 0)
    );
  }

  await t.test('grade first segment', t => {
    const profile = [
      {
        ll: [-110.90401, 40.68914],
        elevation: 3297
      },
      {
        ll: [-110.90406, 40.6891],
        elevation: 3297
      },
      {
        ll: [-110.90461, 40.68986],
        elevation: 3312
      }
    ];
    grade(profile, 250);
    t.assert.equal(roundDistance(profile), 103);
    t.assert.deepEqual(profile, [
      {
        ll: [-110.90401, 40.68914],
        elevation: 3297,
        distance: 0
      },
      {
        ll: [-110.90406, 40.6891],
        elevation: 3299,
        distance: 6
      },
      {
        ll: [-110.90461, 40.68986],
        elevation: 3312,
        distance: 96
      }
    ]);
  });

  await t.test('grade incline', t => {
    const profile = [
      {
        ll: [-110.90406, 40.6891],
        elevation: 3298
      },
      {
        ll: [-110.90461, 40.68986],
        elevation: 3312
      },
      {
        ll: [-110.90452, 40.69042],
        elevation: 3312
      },
      {
        ll: [-110.90527, 40.69057],
        elevation: 3312
      },
      {
        ll: [-110.90559, 40.69081],
        elevation: 3312
      },
      {
        ll: [-110.90575, 40.69102],
        elevation: 3312
      },
      {
        ll: [-110.90517, 40.69109],
        elevation: 3312
      },
      {
        ll: [-110.90504, 40.69119],
        elevation: 3312
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3312
      },
      {
        ll: [-110.9057, 40.69133],
        elevation: 3312
      },
      {
        ll: [-110.90525, 40.69142],
        elevation: 3312
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3312
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3452
      }
    ];
    grade(profile, 250);
    t.assert.equal(roundDistance(profile), 525);
    t.assert.deepEqual(profile, [
      {
        ll: [-110.90406, 40.6891],
        elevation: 3298,
        distance: 0
      },
      {
        ll: [-110.90461, 40.68986],
        elevation: 3303,
        distance: 96
      },
      {
        ll: [-110.90452, 40.69042],
        elevation: 3306,
        distance: 63
      },
      {
        ll: [-110.90527, 40.69057],
        elevation: 3310,
        distance: 65
      },
      {
        ll: [-110.90559, 40.69081],
        elevation: 3312,
        distance: 38
      },
      {
        ll: [-110.90575, 40.69102],
        elevation: 3326,
        distance: 27
      },
      {
        ll: [-110.90517, 40.69109],
        elevation: 3353,
        distance: 50
      },
      {
        ll: [-110.90504, 40.69119],
        elevation: 3361,
        distance: 16
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3376,
        distance: 27
      },
      {
        ll: [-110.9057, 40.69133],
        elevation: 3393,
        distance: 32
      },
      {
        ll: [-110.90525, 40.69142],
        elevation: 3414,
        distance: 39
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3432,
        distance: 34
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3452,
        distance: 38
      }
    ]);
  });

  await t.test('grade decline', t => {
    const profile = [
      {
        ll: [-110.90632, 40.69176],
        elevation: 3452
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3312
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3312
      },
      {
        ll: [-110.90524, 40.69142],
        elevation: 3312
      },
      {
        ll: [-110.9057, 40.69132],
        elevation: 3312
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3312
      },
      {
        ll: [-110.90504, 40.69118],
        elevation: 3312
      },
      {
        ll: [-110.90518, 40.69108],
        elevation: 3312
      },
      {
        ll: [-110.90575, 40.69103],
        elevation: 3312
      },
      {
        ll: [-110.90559, 40.69081],
        elevation: 3312
      },
      {
        ll: [-110.90526, 40.69056],
        elevation: 3312
      },
      {
        ll: [-110.90452, 40.69042],
        elevation: 3312
      },
      {
        ll: [-110.90461, 40.68989],
        elevation: 3312
      },
      {
        ll: [-110.90409, 40.68912],
        elevation: 3297
      }
    ];
    grade(profile, 250);
    t.assert.equal(roundDistance(profile), 554);
    t.assert.deepEqual(profile, [
      {
        ll: [-110.90632, 40.69176],
        elevation: 3452,
        distance: 0
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3437,
        distance: 31
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3417,
        distance: 38
      },
      {
        ll: [-110.90524, 40.69142],
        elevation: 3400,
        distance: 34
      },
      {
        ll: [-110.9057, 40.69132],
        elevation: 3380,
        distance: 40
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3364,
        distance: 32
      },
      {
        ll: [-110.90504, 40.69118],
        elevation: 3350,
        distance: 27
      },
      {
        ll: [-110.90518, 40.69108],
        elevation: 3342,
        distance: 16
      },
      {
        ll: [-110.90575, 40.69103],
        elevation: 3317,
        distance: 48
      },
      {
        ll: [-110.90559, 40.69081],
        elevation: 3311,
        distance: 28
      },
      {
        ll: [-110.90526, 40.69056],
        elevation: 3309,
        distance: 39
      },
      {
        ll: [-110.90452, 40.69042],
        elevation: 3305,
        distance: 64
      },
      {
        ll: [-110.90461, 40.68989],
        elevation: 3302,
        distance: 59
      },
      {
        ll: [-110.90409, 40.68912],
        elevation: 3297,
        distance: 96
      }
    ]);
  });

  await t.test('grade saddle', t => {
    const profile = [
      {
        ll: [-110.90632, 40.69176],
        elevation: 3452
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3312
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3312
      },
      {
        ll: [-110.90524, 40.69142],
        elevation: 3312
      },
      {
        ll: [-110.9057, 40.69132],
        elevation: 3312
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3312
      },
      {
        ll: [-110.90504, 40.69118],
        elevation: 3312
      },
      {
        ll: [-110.90518, 40.69108],
        elevation: 3452
      }
    ];
    grade(profile, 250);
    t.assert.equal(roundDistance(profile), 218);
    t.assert.deepEqual(profile, [
      {
        ll: [-110.90632, 40.69176],
        elevation: 3452,
        distance: 0
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3413,
        distance: 31
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3364,
        distance: 38
      },
      {
        ll: [-110.90524, 40.69142],
        elevation: 3320,
        distance: 34
      },
      {
        ll: [-110.9057, 40.69132],
        elevation: 3356,
        distance: 40
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3396,
        distance: 32
      },
      {
        ll: [-110.90504, 40.69118],
        elevation: 3431,
        distance: 27
      },
      {
        ll: [-110.90518, 40.69108],
        elevation: 3452,
        distance: 16
      }
    ]);
  });

  await t.test('grade bulge', t => {
    const profile = [
      {
        ll: [-110.90632, 40.69176],
        elevation: 3312
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3452
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3452
      },
      {
        ll: [-110.90524, 40.69142],
        elevation: 3452
      },
      {
        ll: [-110.9057, 40.69132],
        elevation: 3452
      },
      {
        ll: [-110.90504, 40.69118],
        elevation: 3452
      },
      {
        ll: [-110.90518, 40.69108],
        elevation: 3312
      }
    ];
    grade(profile, 250);
    t.assert.equal(roundDistance(profile), 217);
    t.assert.deepEqual(profile, [
      {
        ll: [-110.90632, 40.69176],
        elevation: 3312,
        distance: 0
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3351,
        distance: 31
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3400,
        distance: 38
      },
      {
        ll: [-110.90524, 40.69142],
        elevation: 3445,
        distance: 34
      },
      {
        ll: [-110.9057, 40.69132],
        elevation: 3407,
        distance: 40
      },
      {
        ll: [-110.90504, 40.69118],
        elevation: 3333,
        distance: 58
      },
      {
        ll: [-110.90518, 40.69108],
        elevation: 3312,
        distance: 16
      }
    ]);
  });

  await t.test('limit', t => {
    const profile = [
      {
        ll: [-110.90406, 40.6891],
        elevation: 3298
      },
      {
        ll: [-110.90461, 40.68986],
        elevation: 3312
      },
      {
        ll: [-110.90452, 40.69042],
        elevation: 3312
      },
      {
        ll: [-110.90527, 40.69057],
        elevation: 3312
      },
      {
        ll: [-110.90559, 40.69081],
        elevation: 3312
      },
      {
        ll: [-110.90575, 40.69102],
        elevation: 3312
      },
      {
        ll: [-110.90517, 40.69109],
        elevation: 3312
      },
      {
        ll: [-110.90504, 40.69119],
        elevation: 3312
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3312
      },
      {
        ll: [-110.9057, 40.69133],
        elevation: 3312
      },
      {
        ll: [-110.90525, 40.69142],
        elevation: 3312
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3312
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3452
      }
    ];
    grade(profile, 100);
    t.assert.equal(roundDistance(profile), 525);
    t.assert.deepEqual(profile, [
      {
        ll: [-110.90406, 40.6891],
        elevation: 3298,
        distance: 0
      },
      {
        ll: [-110.90461, 40.68986],
        elevation: 3310,
        distance: 96
      },
      {
        ll: [-110.90452, 40.69042],
        elevation: 3312,
        distance: 63
      },
      {
        ll: [-110.90527, 40.69057],
        elevation: 3312,
        distance: 65
      },
      {
        ll: [-110.90559, 40.69081],
        elevation: 3312,
        distance: 38
      },
      {
        ll: [-110.90575, 40.69102],
        elevation: 3312,
        distance: 27
      },
      {
        ll: [-110.90517, 40.69109],
        elevation: 3312,
        distance: 50
      },
      {
        ll: [-110.90504, 40.69119],
        elevation: 3312,
        distance: 16
      },
      {
        ll: [-110.90536, 40.6912],
        elevation: 3312,
        distance: 27
      },
      {
        ll: [-110.9057, 40.69133],
        elevation: 3312,
        distance: 32
      },
      {
        ll: [-110.90525, 40.69142],
        elevation: 3334,
        distance: 39
      },
      {
        ll: [-110.90555, 40.69162],
        elevation: 3389,
        distance: 34
      },
      {
        ll: [-110.906, 40.69163],
        elevation: 3452,
        distance: 38
      }
    ]);
  });
});
