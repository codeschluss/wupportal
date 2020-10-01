import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { from } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { ServiceProvider as Compat } from './service.provider.i';

@Injectable({ providedIn: 'root' })
export class ServiceProvider implements Compat {

  public constructor(
    private applicationRef: ApplicationRef,
    private deviceProvicer: DeviceProvider,
    private swUpdate: SwUpdate
  ) { }

  public update(): void {
    if (this.swUpdate.isEnabled) {
      this.applicationRef.isStable.pipe(
        filter(Boolean), take(1),
        mergeMap(() => from(this.swUpdate.checkForUpdate())),
        mergeMap(() => this.swUpdate.available)
      ).subscribe(() => this.deviceProvicer.reload());
    }
  }

}
