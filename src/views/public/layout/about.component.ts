import { Component, AfterViewInit } from '@angular/core';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { AddressModel } from '../../../realm/address/address.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { ScheduleModel } from '../../../realm/schedule/schedule.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  styleUrls: ['about.component.css'],
  templateUrl: 'about.component.html'
})

export class AboutComponent implements AfterViewInit {

  public activities: any[];

  index = 0;
  speed = 5000;
  infinite = false;
  direction = 'right';
  directionToggle = true;
  autoplay = false;

  constructor(
    public route: ActivatedRoute
  ) {
  }

  ngAfterViewInit(): void {
    this.activities = this.route.snapshot.data.activities;
  }

  buildTestActivity(): ActivityModel {
    const actOne = new ActivityModel;
    actOne.id = 'testActivity';
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
    testSubUrb.id = '1';

    testAddress.suburb = new Promise<SuburbModel>((resolve, reject) => {
      resolve(testSubUrb);
    });

    testAddress.place = 'SampleCity';
    actOne.address = new Promise<AddressModel>((resolve, reject) => {
      resolve(testAddress);
    });

    const category = new CategoryModel;
    category.name = 'party';
    category.color = 'blue';

    actOne.category = new Promise<CategoryModel>((resolve, reject) => {
      resolve(category);
    });

    const target_group = new TargetGroupModel;
    target_group.name = 'youth';
    const targetGroups = [target_group];

    actOne.targetGroups = new Promise<TargetGroupModel[]>((resolve, reject) => {
      resolve(targetGroups);
    });

    const schedule = new ScheduleModel;
    schedule.startDate = new Date().toUTCString();
    schedule.endDate = new Date().toUTCString();
    const schedules = [schedule];

    const firstDate = new ScheduleModel;
    firstDate.startDate = new Date().toISOString();
    firstDate.endDate =
      new Date(new Date(firstDate.startDate).getDate() + 1).toISOString();

      const secondDate = new ScheduleModel;
    secondDate.startDate = new Date(new Date().getDate() + 7).toISOString();
    secondDate.endDate =
      new Date(new Date(secondDate.startDate).getDate() + 1).toISOString();

      schedules.push(firstDate);
    schedules.push(secondDate);

    actOne.schedules = new Promise<ScheduleModel[]>((resolve, reject) => {
      resolve(schedules);
    });

    const organisation = new OrganisationModel;
    organisation.name = 'testOrganisation';
    actOne.organisation = new Promise<OrganisationModel>((resolve, reject) => {
      resolve(organisation);
    });

    return actOne;
}

}
