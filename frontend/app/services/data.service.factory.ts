
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Model } from 'app/models/model';

export function dataServiceFactory(repository: string): any {
	return (http: HttpClient) => {
		return new DataService(http, repository);
	};
}
