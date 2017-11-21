import { Injectable } from '@angular/core';

import { Organisation } from 'app/models/organisation';
import { Service } from 'app/services/service';

@Injectable()
export class OrganisationService extends Service<Organisation> {

	protected baseURL: string = '/organisations/';

}
