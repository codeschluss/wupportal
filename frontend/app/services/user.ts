import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { User } from 'app/models/user';

@Injectable()
export class UserService extends Service<User> {

	protected url: string = '/users/';

}
