import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PlatformProvider } from '../platform/platform.provider';
import { LoadingIndicatorComponent as Compat } from './loading.indicator.i';
import { LoadingProvider } from './loading.provider';

@Component({
  selector: 'loading-indicator',
  styles: [`mat-progress-bar { height: 2px; transition: height 200ms; }`],
  template: `
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  `,
})

export class LoadingIndicatorComponent implements Compat {

  @ViewChild(MatProgressBar, { read: ElementRef, static: true })
  public indicator: ElementRef<HTMLElement>;

  public constructor(
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider
    ) { }

  public ngAfterViewInit(): void {
    switch (this.platformProvider.name) {
      case 'Server':
        this.indicator.nativeElement.style.display = 'none';
        break;

      case 'Web':
        this.loadingProvider.value.subscribe((loading) => {
          this.indicator.nativeElement.style.height = loading ? null : '0px';
        });
        break;
    }
  }

}
