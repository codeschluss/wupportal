import { InjectionToken } from '@angular/core';

import { DataResolver } from 'app/services/data.resolver';
import { DataService } from 'app/services/data.service';

export const ActivityResolver = new InjectionToken<DataResolver>('activities');
export const AddressResolver = new InjectionToken<DataResolver>('addresses');
export const CategoryResolver = new InjectionToken<DataResolver>('categories');
export const ConfigurationResolver = new InjectionToken<DataResolver>('configurations');
export const OrganisationResolver = new InjectionToken<DataResolver>('organisations');
export const ProviderResolver = new InjectionToken<DataResolver>('providers');
export const ScheduleResolver = new InjectionToken<DataResolver>('schedules');
export const SuburbResolver = new InjectionToken<DataResolver>('suburbs');
export const TagResolver = new InjectionToken<DataResolver>('tags');
export const TargetGroupResolver = new InjectionToken<DataResolver>('target_groups');
export const TranslationResolver = new InjectionToken<DataResolver>('translations');
export const UserResolver = new InjectionToken<DataResolver>('users');

export function DataResolverFactory(token: InjectionToken<DataResolver>): any {
	return (dataService: DataService) =>  new DataResolver(dataService);
}
