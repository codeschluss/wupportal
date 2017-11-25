
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Model } from 'app/models/model';

export function dataServiceFactory(model: Model): DataService<any> {
	return (http: HttpClient): DataService<any> => {
		return new DataService<any>(http, model.getRepository());
	};
}
