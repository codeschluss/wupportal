import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { Suburb } from 'app/models/suburb';

@Injectable()
export class SuburbService extends Service<Suburb> {

	protected url: string = '/suburbs/';

}
