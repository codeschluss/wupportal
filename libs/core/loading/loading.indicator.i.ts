import { AfterViewInit, ElementRef } from '@angular/core';

export interface LoadingIndicatorComponent extends AfterViewInit {

  indicator: ElementRef<any>;

}
