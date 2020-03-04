import { Component } from '@angular/core';

import { CurrentFilterService } from './current-filter.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'current-filter',
  template: `
    <mat-slide-toggle
      (change)="onChange($event)"
      [color]="primary"
      [checked]="checked">
        <i18n i18n="@@currentOnly">currentOnly</i18n>
    </mat-slide-toggle>
  `
})
export class CurrentFilterComponent {

  public checked: boolean = false;

  constructor(
    private currentFilter: CurrentFilterService
  ) { }

  public onChange(event: MatSlideToggleChange) {
    this.currentFilter.changeCurrent(event.checked);
  }

}
