import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import * as robots from 'express-robots-txt';
import { readFile } from 'fs';
import { bindNodeCallback } from 'rxjs';
import 'zone.js/dist/zone-node';

enableProdMode();

const config = require('../package.json').config;

const client = {
  engine: express(),
  port: process.env.PORT || 4000,
  read: bindNodeCallback(readFile),
  root: `${process.cwd()}/target/@wooportal`,

  request: null,
  response: null
};

const engine = {
  deps: [],
  provide: 'express',
  useFactory: () => client
};

const {
  ServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`${client.root}/server/main`);

client.engine.engine('html', ngExpressEngine({
  bootstrap: ServerModuleNgFactory,
  providers: [engine, provideModuleMap(LAZY_MODULE_MAP)]
}));

client.engine.set('view engine', 'html');
client.engine.set('views', `${client.root}/client`);

client.engine.use(robots({
  UserAgent: '*',
  Disallow: ['/*.js$'],
  Sitemap: config.defaults.appUrl + config.api.rootUrl + '/sitemap'
}));

client.engine.get('*.*', express.static(`${client.root}/client`, {
  maxAge: '30d'
}));

client.engine.get('*', (request, response) => {
  Object.assign(client, { request, response });
  response.render('index', { req: request });
});

client.engine.listen(client.port, () => {
  console.log(`Listening on http://0.0.0.0:${client.port}`);
});
