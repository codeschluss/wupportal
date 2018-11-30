import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ActivityModel } from '../../../realm/activity/activity.model';

@Component({
  selector: 'bottom-sheet',
  template: '<div id="largeMap"><mapping-component ' +
    '[activities] = activities> ' +
    '</mapping-component></div>',
  styleUrls: ['map.bottomsheet.component.css']
})
export class BottomSheetMapComponent {
  activities: ActivityModel[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetMapComponent>) {
    this.activities = data.activities;
  }
}
