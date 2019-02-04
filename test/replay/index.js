const Replay = require('@pirxpilot/replay');
Replay.fixtures = __dirname;

// default replay mode is 'replay'
// change it by setting REPLAY environment variable:
// REPLAY=record make

// HACK: fetchagent is checking those - instead of using jsdom-global, declare them as empty
if (!global.Blob) {
  global.Blob = function Blob() {};
}
if (!global.FormData) {
  global.FormData = function FormData() {};
}
