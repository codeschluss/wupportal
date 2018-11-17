import { Component, ElementRef, Input, OnInit, ViewChild, Output } from '@angular/core';

// import { ActivatedRoute, ParamMap } from '@angular/router';

import { ActivityModel } from '../../../core/models/activity.model';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddressModel } from '../../../core/models/address.model';
import { SuburbModel } from '../../../core/models/suburb.model';
import { CategoryModel } from '../../../core/models/category.model';
import { TargetGroupModel } from '../../../core/models/target-group.model';
import { ScheduleModel } from '../../../core/models/schedule.model';
import { OrganisationModel } from '../../../core/models/organisation.model';
import { MappingComponent } from '../mapping/mapping.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BottomSheetScheduleComponent } from './activity.bottom.sheet.component';
import { BottomSheetMapComponent } from './activity.map.component';


@Component({
  styleUrls: [],
  templateUrl: 'activity.view.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})

export class ActivityViewComponent implements OnInit {

  public static readonly imports = [];
  public item: ActivityModel;
  public viewSchedules: boolean;
  public selectables: ActivityModel[] = [];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private adapter: DateAdapter<any>
    // route: ActivatedRoute,
    // private activityService: ActivityService,
  ) {
    this.item = new ActivityModel;
    this.item.name = 'FakeActivity';
    this.item.description = 'This is just a FakeActivity to show'
      + 'how this could look like.';

    const testAddress = new AddressModel();
    testAddress.street = 'samplestreet';
    testAddress.houseNumber = '42a';
    testAddress.latitude = 51.00;
    testAddress.longitude = 7.00;
    testAddress.postalCode = '63628';
    const testSubUrb = new SuburbModel();
    testSubUrb.name = 'Elberfeld';
    testAddress.suburb = testSubUrb;
    testAddress.place = 'SampleCity';
    testAddress.suburb.id = '1';

    this.item.address = testAddress;

    const category = new CategoryModel;
    category.name = 'party';
    this.item.category = category;

    const target_group = new TargetGroupModel;
    target_group.name = 'youth';
    this.item.targetGroups = [target_group];

    const schedule = new ScheduleModel;
    schedule.startDate = new Date().toUTCString();
    schedule.endDate = new Date().toUTCString();
    this.item.schedules = [schedule];

    const organisation = new OrganisationModel;
    organisation.name = 'testOrganisation';
    // this.item.provider.organisation = organisation;

    const firstDate = new ScheduleModel;
    firstDate.startDate = new Date().toISOString();
    firstDate.endDate =
      new Date(new Date(firstDate.startDate).getDate() + 1).toISOString();

    const secondDate = new ScheduleModel;
    secondDate.startDate = new Date(new Date().getDate() + 7).toISOString();
    secondDate.endDate =
      new Date(new Date(secondDate.startDate).getDate() + 1).toISOString();

    this.item.schedules.push(firstDate);
    this.item.schedules.push(secondDate);

    this.selectables.push(this.item);
  }

  public ngOnInit(): void {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     return this.activityService.get(params.get('uuid'));
    //   })
    //   .subscribe(activity => {
    //     this.item = activity;
    //   });
  }

  openBottomSheetSchedules(): void {
    this.bottomSheet.open(BottomSheetScheduleComponent,
      { data: { schedules: this.item.schedules } });
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      { data: { activities: this.selectables } });
  }

}
