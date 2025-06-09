module.exports = init;

function init({ parameters: { timeout = 0 } = {} }) {
  let timeoutId;

  function query(points) {
    const result = points.map(ll => ({
      ll,
      elevation: Math.round(Math.random() * 1000)
    }));
    return new Promise(resolve => {
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        resolve(result);
      }, timeout);
    });
  }

  function abort() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }

  return { query, abort };
}
