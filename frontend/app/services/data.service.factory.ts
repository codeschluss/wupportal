
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';

export const UserService = new InjectionToken<DataService>('users');
export const TagService = new InjectionToken<DataService>('tags');
export const TargetGroupService = new InjectionToken<DataService>('targetGroups');
export const OrganisationService = new InjectionToken<DataService>('organisations');
export const CategoryService = new InjectionToken<DataService>('categories');
export const ConfigurationService = new InjectionToken<DataService>('configurations');

export function DataServiceFactory(service: InjectionToken<DataService>): any {
	const repository: string = this.getRepository(service.toString());
	return (http: HttpClient) => {
		return new DataService(http, repository);
	};
}
