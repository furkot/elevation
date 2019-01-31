[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

# furkot-elevation

Elevation service for Furkot

## Install

```sh
$ npm install --save furkot-elevation
```

## Usage

```js
const furkotElevation = require('furkot-elevation');

const elevation = furkotElevation(options);

const points = [
  [ lon, lat ] ,
  // ...
];

elevation(points, function(err, result) {
  // result is an Array of elevations in meters
  // elevation Array items corresponds to the items in points array 
  assert.equal(result.length, points.length);
});
```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/furkot-elevation.svg
[npm-url]: https://npmjs.org/package/furkot-elevation

[travis-url]: https://travis-ci.com/furkot/elevation
[travis-image]: https://img.shields.io/travis/com/furkot/elevation.svg

[deps-image]: https://img.shields.io/david/furkot/elevation.svg
[deps-url]: https://david-dm.org/furkot/elevation

[deps-dev-image]: https://img.shields.io/david/dev/furkot/elevation.svg
[deps-dev-url]: https://david-dm.org/furkot/elevation?type=dev
