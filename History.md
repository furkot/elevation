
1.0.2 / 2022-08-30
==================

 * fix tests for node 18
 * remove localenv module
 * upgrade mocha to ~10
 * replace Travis CI with github actions
 * rename to @furkot/elevation

1.0.1 / 2021-10-15
==================

 * error handling

1.0.0 / 2021-10-12
==================

 * upgrade dev dependencies
 * attempt to query the next service when first one takes too long
 * invoke callback on timeout
 * support Valhalla elevation profile service
 * fix test of POST request to tatry service

0.4.0 / 2019-02-07
==================

 * add tatry service

0.3.0 / 2019-02-05
==================

 * optionally smooth the profile to give illusion of higher accuracy

0.2.1 / 2019-02-04
==================

 * change open-elevation option host to url
 * return original points as part of the result
 * fix: check result when setting common fields

0.2.0 / 2019-02-03
==================

 * add open-elevation service
 * change returned value to array of pairs: ll and elevation
 * return successfull provider and stats on attempted providers
 * fix: return just the result
 * fix: initialize query id
 * use fetchagent in elevation-api-io service

0.1.0 / 2019-02-01
==================

 * implement elevation-api.io service
 * add testing infrastructure

0.0.1 / 2019-01-31
==================

 * add random service for testing
