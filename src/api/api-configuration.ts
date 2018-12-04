/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'http://localhost/';
}
