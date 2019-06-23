import { Component, ElementRef, ViewChild } from '@angular/core';
import { Progress } from 'tns-core-modules/ui/progress';
import { PlatformProvider } from '../platform/platform.provider';
import { LoadingIndicatorComponent as Compat } from './loading.indicator.i';
import { LoadingProvider } from './loading.provider';

@Component({
  selector: 'loading-indicator',
  template: `
    <Progress #indicator maxValue="100" [value]="counter"></Progress>
  `,
})

export class LoadingIndicatorComponent implements Compat {

  public counter: number = 50;

  @ViewChild('indicator', { read: ElementRef, static: true })
  public indicator: ElementRef<Progress>;

  public constructor(
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider
  ) { }

  public ngAfterViewInit(): void {
    switch (this.platformProvider.name) {
      case 'Android':
        // TODO: https://github.com/NativeScript/nativescript-angular/issues/848
        this.indicator.nativeElement.once('loaded', () =>
          this.indicator.nativeElement.android.setIndeterminate(true));
        break;

      case 'iOS':
        setInterval(() => this.count(), 20);
        break;
    }

    this.loadingProvider.value.subscribe((loading) => {
      this.indicator.nativeElement.style.height = loading ? 4 : 0;
    });
  }

  private count(): void {
    this.counter = this.counter >= 100 ? 0 : this.counter++;
  }

}
