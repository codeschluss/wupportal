import { Component, ViewChild } from '@angular/core';
import { ActivityModel } from '../../../core/models/activity.model';
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
import { BottomSheetScheduleComponent } from './schedules.bottom.sheet.component';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { ActivityProvider } from 'src/core/providers/activity.provider';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


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

export class ActivityViewComponent {

  public static readonly imports = [];
  public placeHolderActivity: ActivityModel;
  public viewSchedules: boolean;
  public activity: ActivityModel;

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private adapter: DateAdapter<any>,
    private activityProvider: ActivityProvider,
    route: ActivatedRoute,
  ) {
    const id  = route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      activityProvider.findOne(params.get('id')).then(act => this.activity = act))
      ).subscribe();

    
    this.placeHolderActivity = new ActivityModel;
    this.placeHolderActivity.name = 'FakeActivity';
    this.placeHolderActivity.description = 'This is just a FakeActivity to show'
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

    this.placeHolderActivity.address = testAddress;

    const category = new CategoryModel;
    category.name = 'party';
    category.color = 'red';
    this.placeHolderActivity.category = category;

    const target_group = new TargetGroupModel;
    target_group.name = 'youth';
    this.placeHolderActivity.targetGroups = [target_group];

    const schedule = new ScheduleModel;
    schedule.startDate = new Date().toUTCString();
    schedule.endDate = new Date().toUTCString();
    this.placeHolderActivity.schedules = [schedule];

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

    this.placeHolderActivity.schedules.push(firstDate);
    this.placeHolderActivity.schedules.push(secondDate);
  }

  openBottomSheetSchedules(): void {
    this.bottomSheet.open(BottomSheetScheduleComponent,
      { data: { schedules: this.placeHolderActivity.schedules } });
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      { data: { activities: [this.placeHolderActivity] } });
  }

}
