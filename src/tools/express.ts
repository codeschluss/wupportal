import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as robots from 'express-robots-txt';
import 'zone.js/dist/zone-node';
import { ServerModule } from '../server';
import { SettingsJson } from './settings';

const apiRoot = SettingsJson.api.rootUrl;
const baseUrl = SettingsJson.app.baseUrl;

const path = `${process.cwd()}/platforms/browser/www`
const port = process.env.PORT || '4000'
const server = express();

server.engine('html', ngExpressEngine({
  bootstrap: ServerModule
}));

server.set('view engine', 'html');
server.set('views', path);

server.use(robots({
  UserAgent: '*',
  Disallow: ['/*.js$'],
  Sitemap: `${baseUrl}${apiRoot}/sitemap`
}));

server.get('*.*', express.static(path, {
  maxAge: '30d'
}));

server.get('*', (request, response) => {
  response.render('index', { req: request });
});

server.listen(port, () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});
