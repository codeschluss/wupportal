import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { TargetGroup } from 'app/models/target-group';

@Injectable()
export class TargetGroupService extends Service<TargetGroup> {

	protected baseURL: string = '/target_groups/';

}
