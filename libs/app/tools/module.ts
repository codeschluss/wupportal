import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ClassProvider, NgModule } from '@angular/core';
import { DeviceInterceptor } from '../device/device.interceptor';
import { ApplicationSettings } from './settings';

const interceptors: ClassProvider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: DeviceInterceptor, multi: true }
];

@NgModule({
  providers: [
    ...interceptors
  ]
})

export class AppModule {

  public static forRoot(settings: ApplicationSettings): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        { provide: ApplicationSettings, useValue: settings }
      ]
    };
  }

}
