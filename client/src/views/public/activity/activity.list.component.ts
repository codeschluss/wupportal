import { Component, OnInit, ViewChild} from '@angular/core';

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


@Component({
  styleUrls: ['activity.list.component.css', '../main.css'],
  templateUrl: 'activity.list.component.html',
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

export class ActivityListComponent implements OnInit {

  public static readonly imports = [];
  public viewSchedules: boolean;
  public activities: ActivityModel[] = [];

  public suburbs: SuburbModel[] = [];
  public categories: CategoryModel[] = [];
  public target_groups: TargetGroupModel[] = [];

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private adapter: DateAdapter<any>
    // route: ActivatedRoute,
    // private activityService: ActivityService,
  ) {
    for (let i = 0; i < 12; i++) {
      this.activities.push(
        this.buildTestActions());
    }

    this.getSuburbs();
    this.getCategories();
    this.getTargetGroups();

  }

  public ngOnInit(): void {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     return this.activityService.get(params.get('uuid'));
    //   })
    //   .subscribe(activity => {
    //     actOne = activity;
    //   });
  }

  buildTestActions(): ActivityModel {

    const actOne = new ActivityModel;
    actOne.name = 'FakeActivity';
    actOne.description = 'This is just a FakeActivity to show'
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

    actOne.address = testAddress;

    const category = new CategoryModel;
    category.name = 'party';
    category.color = 'blue';
    actOne.category = category;

    const target_group = new TargetGroupModel;
    target_group.name = 'youth';
    actOne.targetGroups = [target_group];

    const schedule = new ScheduleModel;
    schedule.startDate = new Date().toUTCString();
    schedule.endDate = new Date().toUTCString();
    actOne.schedules = [schedule];

    const organisation = new OrganisationModel;
    organisation.name = 'testOrganisation';
    // actOne.provider.organisation = organisation;

    const firstDate = new ScheduleModel;
    firstDate.startDate = new Date().toISOString();
    firstDate.endDate =
      new Date(new Date(firstDate.startDate).getDate() + 1).toISOString();

    const secondDate = new ScheduleModel;
    secondDate.startDate = new Date(new Date().getDate() + 7).toISOString();
    secondDate.endDate =
      new Date(new Date(secondDate.startDate).getDate() + 1).toISOString();

    actOne.schedules.push(firstDate);
    actOne.schedules.push(secondDate);
    return actOne;
  }

  getSuburbs(): void {
    const subOne = new SuburbModel;
    subOne.name = 'Elberfeld';
    const subTwo = new SuburbModel;
    subTwo.name = 'Winklinghausen';
    const subThree = new SuburbModel;
    subThree.name = 'Soden';
    this.suburbs.push(subOne);
    this.suburbs.push(subTwo);
    this.suburbs.push(subThree);


  }

  getCategories(): void {
    const catOne = new CategoryModel;
    catOne.name = 'Sport';
    catOne.color = 'yellow';
    const catTwo = new CategoryModel;
    catTwo.name = 'Party';
    catTwo.color = 'red';
    const catThree = new CategoryModel;
    catThree.name = 'Kochen';
    catThree.color = 'blue';
    const catFour = new CategoryModel;
    catFour.name = 'Schopping';
    catFour.color = 'green';

    this.categories.push(catOne);
    this.categories.push(catTwo);
    this.categories.push(catThree);
    this.categories.push(catFour);

  }

  getTargetGroups(): void {

    const tgOne = new TargetGroupModel;
    tgOne.name = 'Mädchen';
    const tgTwo = new TargetGroupModel;
    tgTwo.name = 'Jungen';
    const tgThree = new TargetGroupModel;
    tgThree.name = 'LSBQT';
    const tgFour = new TargetGroupModel;
    tgFour.name = 'Teenies';

    this.target_groups.push(tgOne);
    this.target_groups.push(tgTwo);
    this.target_groups.push(tgThree);
    this.target_groups.push(tgFour);

  }

}
