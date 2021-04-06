const { existsSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

module.exports = function(ctx) {
  for (let i = 0; i < ctx.opts.platforms.length; i++) {
    const file = join(ctx.opts.paths[i], 'index.html');
    let href = undefined;

    switch (ctx.opts.platforms[i]) {
      case 'android':
        href = 'file:///android_asset/www/index.html';
        break;

      case 'ios':
        href = './index.html';
        break;
    }

    if (href && existsSync(file)) {
      let html = readFileSync(file, 'utf8');
      html = html.replace(/base href="[^"]*"/, 'base href="' + href + '"');
      writeFileSync(file, html, 'utf8');
    }
  }
}
