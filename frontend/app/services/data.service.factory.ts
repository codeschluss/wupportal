
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { DataService } from 'app/services/data.service';
import { UserService } from 'app/services/user.service';

export const TagService = new InjectionToken<DataService>('tags');
export const TargetGroupService = new InjectionToken<DataService>('target_groups');
export const OrganisationService = new InjectionToken<DataService>('organisations');
export const AddressService = new InjectionToken<DataService>('addresses');
export const ScheduleService = new InjectionToken<DataService>('schedules');
export const SuburbService = new InjectionToken<DataService>('suburbs');
export const CategoryService = new InjectionToken<DataService>('categories');
export const ConfigurationService = new InjectionToken<DataService>('configurations');
export const UserDataService = new InjectionToken<DataService>('users');
export const ForgotPasswordService = new InjectionToken<DataService>('forgotpwd');

export function DataServiceFactory(service: InjectionToken<DataService>): any {
	const repository = service.toString().replace('InjectionToken ', '');
	return (http: HttpClient, userService: UserService, messageBar: MatSnackBar) => {
		return new DataService(repository, http, userService, messageBar);
	};
}
