import LatLon from 'geodesy/latlon-spherical.js';

export default function grade(profile, accuracy) {
  const limit = accuracy ? 2 * accuracy : Number.MAX_VALUE;
  let distance = 0;
  let start = 0;
  let prev = profile[0];
  let p1 = new LatLon(prev.ll[1], prev.ll[0]);
  profile.forEach((p, i) => {
    const p2 = new LatLon(p.ll[1], p.ll[0]);
    p.distance = p1.distanceTo(p2);
    distance += p.distance;
    if (p.elevation !== prev.elevation || distance > limit) {
      if (start < i - 1) {
        gradeSegment(profile, start, i, distance);
      }
      start = i;
      distance = p.distance;
    }
    prev = p;
    p1 = p2;
  });
}

function gradeSegment(profile, i, n, distance) {
  const elevation = {
    false: profile[n].elevation - profile[i].elevation
  };
  if (i) {
    elevation.true = profile[i - 1].elevation - profile[i].elevation;
  }
  const half = distance / 2;
  let running = i ? 0 : half;
  for (; i < n; i += 1) {
    running += profile[i].distance;
    const weight = (running < half ? half - running : running - half) / half;
    profile[i].elevation += Math.round(elevation[running < half] * weight);
  }
}
