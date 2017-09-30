import { Injectable } from '@angular/core';

import { Configuration } from 'app/models/configuration';
import { Service } from 'app/services/service';

@Injectable()
export class ConfigurationService extends Service<Configuration> {

	public repoURL: string = 'configurations/';

	// TODO: Refactor type casting
	getConfiguration(): Promise<Configuration> {
		return this.http.get(this.baseURL + this.repoURL, { headers: this.headers })
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
