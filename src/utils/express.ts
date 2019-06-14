import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import { readFile } from 'fs';
import { bindNodeCallback } from 'rxjs';
import 'zone.js/dist/zone-node';

enableProdMode();

global['navigator'] = { };

const client = {
  engine: express(),
  port: process.env.PORT || 4000,
  read: bindNodeCallback(readFile),
  root: `${process.cwd()}/target/@wooportal`
};

const {
  ServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`${client.root}/server/main`);

client.engine.engine('html', ngExpressEngine({
  bootstrap: ServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
    { provide: 'express', deps: [], useFactory: () => client }
  ]
}));

client.engine.set('view engine', 'html');
client.engine.set('views', `${client.root}/client`);

client.engine.get('*.*', express.static(`${client.root}/client`, {
  maxAge: '1y'
}));

client.engine.get('*', (req, res) => {
  global['navigator']['language'] = req.headers['accept-language'];

  res.render('index', { req });
});

client.engine.listen(client.port, () => {
  console.log(`Listening on http://0.0.0.0:${client.port}`);
});
