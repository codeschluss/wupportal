import { Component } from '@angular/core';
import { ActivityModel } from '../../../core/models/activity.model';
import { AddressModel } from '../../../core/models/address.model';
import { CategoryModel } from '../../../core/models/category.model';
import { ScheduleModel } from '../../../core/models/schedule.model';
import { SuburbModel } from '../../../core/models/suburb.model';
import { TargetGroupModel } from '../../../core/models/target-group.model';




@Component({
  styleUrls: ['about.component.css'],
  templateUrl: 'about.component.html'
})

export class AboutComponent {

  public activities: ActivityModel[] = [];
  index = 0;
  speed = 5000;
  infinite = false;
  direction = 'right';
  directionToggle = true;
  autoplay = false;

  constructor() {
    for (let i = 0; i < 12; i++) {
      this.activities.push(
        this.buildTestActions());
    }
  }


  buildTestActions(): ActivityModel {

    const actOne: any = new ActivityModel;
    actOne.name = 'FakeActivity';
    actOne.description = 'This is just a FakeActivity to show'
      + 'how this could look like.';

    const testAddress: any = new AddressModel();
    testAddress.street = 'samplestreet';
    testAddress.houseNumber = '42a';
    testAddress.latitude = 51.00;
    testAddress.longitude = 7.00;
    testAddress.postalCode = '63628';
    const testSubUrb: any = new SuburbModel();
    testSubUrb.name = 'Elberfeld';
    testAddress.suburb = testSubUrb;
    testAddress.place = 'SampleCity';
    testAddress.suburb.id = '1';

    actOne.address = testAddress;

    const category: any = new CategoryModel;
    category.name = 'party';
    category.color = 'green';
    actOne.category = category;

    const target_group: any = new TargetGroupModel;
    target_group.name = 'youth';
    actOne.targetGroups = [target_group];

    const schedule: any = new ScheduleModel;
    schedule.startDate = new Date().toUTCString();
    schedule.endDate = new Date().toUTCString();
    actOne.schedules = [schedule];

    // const organisation = new OrganisationModel;
    // organisation.name = 'testOrganisation';
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

}
