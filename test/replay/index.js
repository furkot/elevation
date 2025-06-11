const Replay = require('@pirxpilot/replay');
const legacyFetch = require('node-fetch');

Replay.fixtures = __dirname;

// default replay mode is 'replay'
// change it by setting REPLAY environment variable:
// REPLAY=record make

global.fetch = legacyFetch;
global.Response = legacyFetch.Response;
global.Headers = legacyFetch.Headers;
global.Request = legacyFetch.Request;

// HACK: fetchagent is checking those - instead of using jsdom-global, declare them as empty
if (!global.Blob) {
  global.Blob = function Blob() {};
}
if (!global.FormData) {
  global.FormData = function FormData() {};
}
