[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @furkot/elevation

Elevation service for Furkot

## Install

```sh
$ npm install --save @furkot/elevation
```

## Usage

```js
const furkotElevation = require('@furkot/elevation');

const elevation = furkotElevation(options);

const points = [
  [ lon, lat ] ,
  // ...
];

const result = await elevation(points);
// result is an Array of elevations in meters
// elevation Array items corresponds to the items in points array 
assert.equal(result.length, points.length);
```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/@furkot/elevation
[npm-url]: https://npmjs.org/package/@furkot/elevation

[build-url]: https://github.com/furkot/elevation/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/furkot/elevation/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@furkot/elevation
[deps-url]: https://libraries.io/npm/@furkot%2Felevation
