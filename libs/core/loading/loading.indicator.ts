import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatProgressBar } from '@angular/material';
import { LoadingProvider } from './loading.provider';

@Component({
  selector: 'loading-indicator',
  styles: [`
    :host { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; }
    mat-progress-bar { transition: height 200ms; }
  `],
  template: `
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  `,
})

export class LoadingIndicatorComponent implements AfterViewInit {

  @ViewChild(MatProgressBar, { read: ElementRef })
  private indicator: ElementRef;

  public constructor(
    private loadingProvider: LoadingProvider
  ) { }

  public ngAfterViewInit(): void {
    this.loadingProvider.value.subscribe((loading) => {
      this.indicator.nativeElement.style.height = loading ? null : '0px';
    });
  }

}
