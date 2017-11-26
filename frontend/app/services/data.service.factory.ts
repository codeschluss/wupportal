
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';

export const UserService = new InjectionToken<DataService>('UserService');
export const TagService = new InjectionToken<DataService>('TagService');
export const TargetGroupService = new InjectionToken<DataService>('TargetGroupService');
export const OrganisationService = new InjectionToken<DataService>('OrganisationService');
export const CategoryService = new InjectionToken<DataService>('CategoryService');
export const ConfigurationService = new InjectionToken<DataService>('CategoryService');

export function DataServiceFactory(repository: string): any {
	return (http: HttpClient) => {
		return new DataService(http, repository);
	};
}
