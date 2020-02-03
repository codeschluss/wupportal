const fs = require('fs');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  __dirname = process.env.PWD;
  env.aot = env.aot !== undefined ? env.aot : true;
  env.uglify = env.uglify !== undefined ? env.uglify : true;

  const modules = `${process.env.PWD}/node_modules`;
  const template = 'nativescript-dev-webpack/templates/webpack.angular.js';
  const webfonts = '@fortawesome/fontawesome-free/webfonts';
  const webpack = eval(
    fs.readFileSync(`${modules}/${template}`).toString()
      .replace(/entryModule = .*/, 'entryModule = "native.ts";')
      .replace('tsconfig.tns.json', 'tsconfig.json')
  )(env);

  webpack.plugins.push(new CopyPlugin([
    {
      from: `${modules}/${webfonts}/fa-brands-400.ttf`,
      to: 'fonts'
    },
    {
      from: `${modules}/${webfonts}/fa-solid-900.ttf`,
      to: 'fonts'
    },
    {
      from: '../res/All/i18n',
      to: 'i18n'
    },
    {
      from: '../res/All/images',
      to: 'images'
    }
  ]));

  return webpack;
};
