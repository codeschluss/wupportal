import { Injectable } from '@angular/core';

import { Service } from './service';
import { Configuration } from '../common/model/configuration';

@Injectable()
export class ConfigurationService extends Service {

	getConfiguration(): Promise<Configuration> {
		return this.http.get(this.basicURL + '/configuration', { headers: this.headers })
			.toPromise()
			.then(response => response.json().configuration as Configuration)
			.catch(this.handleError);
	}


}
