import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import * as robots from 'express-robots-txt';
import { readFile } from 'fs';
import { bindNodeCallback } from 'rxjs';
import 'zone.js/dist/zone-node';
import { PackageJson } from './package';

declare const __non_webpack_require__: typeof require;
const appRoot = PackageJson.config.defaults.appUrl;
const apiRoot = PackageJson.config.api.rootUrl;

const engine = {
  provide: 'engine',
  useFactory: () => server,
  deps: []
};

const server = {
  base: express(),
  path: `${process.cwd()}/platforms/web`,
  port: process.env.PORT || '4000',
  read: bindNodeCallback(readFile),
  request: null,
  response: null
};

const {
  LAZY_MODULE_MAP,
  ServerModuleNgFactory
} = __non_webpack_require__(`${server.path}/server/main`);

server.base.engine('html', ngExpressEngine({
  bootstrap: ServerModuleNgFactory,
  providers: [engine, provideModuleMap(LAZY_MODULE_MAP)]
}));

server.base.set('view engine', 'html');
server.base.set('views', `${server.path}/browser`);

server.base.use(robots({
  UserAgent: '*',
  Disallow: ['/*.js$'],
  Sitemap: `${appRoot}${apiRoot}/sitemap`
}));

server.base.get('*.*', express.static(`${server.path}/browser`, {
  maxAge: '30d'
}));

server.base.get('*', (request, response) => {
  Object.assign(server, { request, response });
  response.render('index', { req: request });
});

server.base.listen(server.port, () => {
  console.log(`Listening on http://0.0.0.0:${server.port}`);
});
