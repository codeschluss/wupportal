import { Component, ViewChild } from '@angular/core';

import { ActivityModel } from '../../../core/models/activity.model';
import { SuburbModel } from '../../../core/models/suburb.model';
import { CategoryModel } from '../../../core/models/category.model';
import { TargetGroupModel } from '../../../core/models/target-group.model';
import { MappingComponent } from '../mapping/mapping.component';
import { ActivityProvider } from 'src/core/providers/activity.provider';
import { CategoryProvider } from 'src/core/providers/category.provider';
import { TargetGroupProvider } from 'src/core/providers/target-group.provider';
import { SuburbProvider } from 'src/core/providers/suburb.provider';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { MatBottomSheet } from '@angular/material';
import { AddressModel } from 'src/core/models/address.model';

@Component({
  styleUrls: ['activity.list.component.css'],
  templateUrl: 'activity.list.component.html'
})

export class ActivityListComponent {

  public static readonly imports = [];
  public activities: ActivityModel[] = [];

  public suburbs: Promise<SuburbModel[]>;
  public categories: Promise<CategoryModel[]>;
  public target_groups: Promise<TargetGroupModel[]>;

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private activityProvider: ActivityProvider,
    private categoryProvider: CategoryProvider,
    private targetGroupsProvider: TargetGroupProvider,
    private suburbProvider: SuburbProvider
  ) {
    this.suburbs = suburbProvider.findAll();
    this.target_groups = targetGroupsProvider.findAll();
    let longlat = 0;
    activityProvider.findAll().then((i) => {
      i.forEach(act => {
        // just for testing
        const address = new AddressModel;
        address.latitude = longlat;
        address.longitude = longlat;     
        act.address = address;
        const category = new CategoryModel;
        category.color = 'red';
        category.name = 'Sport';
        act.category = category;
        this.activities.push(act);
        longlat++;
      })
    });
    this.categories = categoryProvider.findAll();
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      { data: { activities: this.activities } });
  }

}
