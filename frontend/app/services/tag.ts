import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { Tag } from 'app/models/tag';

@Injectable()
export class TagService extends Service<Tag> {

	protected url: string = '/tags/';

}
