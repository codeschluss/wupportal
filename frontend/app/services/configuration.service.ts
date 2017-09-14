import { Injectable } from '@angular/core';

import { Service } from './service';
import { Configuration } from '../common/model/configuration';

@Injectable()
export class ConfigurationService extends Service {

	// TODO: Refactor type casting
	getConfiguration(): Promise<Configuration> {
		return this.http.get(this.baseURL + 'configurations/', { headers: this.headers })
			.toPromise()
			.then(response => {
				const configResp = response.json().configuration as Configuration;
				let config = new Configuration();
				config = configResp;
				config.mapcenterLatitude = Number(configResp.mapcenterLatitude);
				config.mapcenterLongitude = Number(configResp.mapcenterLongitude);
				config.zoomfactor = Number(configResp.zoomfactor);
				config.mapProjection = configResp.mapProjection;
				config.portalName = configResp.portalName;
				config.portalSubtitle = configResp.portalSubtitle;
				return config;
			})
			.catch(this.handleError);
	}


}
