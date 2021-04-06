const { copyFileSync } = require('fs');
const { join } = require('path');

const assets = [
  ['firebase', 'firebase-app.js'],
  ['firebase', 'firebase-app.js.map'],
  ['firebase', 'firebase-messaging.js'],
  ['firebase', 'firebase-messaging.js.map']
];

module.exports = function(ctx) {
  const path = ctx.opts.paths[ctx.opts.platforms.indexOf('browser')];
  const sources = [];
  const targets = [];

  for (let i = 0; i < assets.length; i++) {
    sources.push(require.resolve(join(...assets[i])));
    targets.push(join(path, assets[i][1]));
  }

  if (assets.length === (sources.length + targets.length) / 2) {
    for (let i = 0; i < assets.length; i++) {
      copyFileSync(sources[i], targets[i]);
    }
  }
}
