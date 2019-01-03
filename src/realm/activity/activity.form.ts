import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { CrudModel } from '@portal/core';
import { BaseForm, ChipListFieldComponent, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'category'">
          <i18n i18n="@@category">category</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'contactName'">
          <i18n i18n="@@contactName">contactName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@mail">mail</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n i18n="@@organisation">organisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'tags'">
          <i18n i18n="@@tags">tags</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'targetGroups'">
          <i18n i18n="@@targetGroups">targetGroups</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityFormComponent extends BaseForm<ActivityModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    },
    {
      name: 'contactName',
      input: StringFieldComponent
    },
    {
      name: 'phone',
      input: StringFieldComponent
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [Validators.required, Validators.email]
    },
    {
      name: 'organisation',
      input: SelectFieldComponent,
      model: OrganisationModel,
      tests: [Validators.required]
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      model: CategoryModel,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      model: TargetGroupModel,
      multi: true
    },
    {
      name: 'tags',
      input: ChipListFieldComponent,
      model: TagModel
    }
  ];

  public model: Type<ActivityModel> = ActivityModel;

  protected ngPostInit(): void {
    const claim = ClientPackage.config.jwtClaims.superUser;
    let organisations = this.route.snapshot.data.organisation;

    if (!this.route.snapshot.data.tokens.access[claim]) {
      organisations = [...new Set([
        ...this.route.snapshot.data.tokens.access
          [ClientPackage.config.jwtClaims.organisationAdmin],
        ...this.route.snapshot.data.tokens.access
          [ClientPackage.config.jwtClaims.organisationUser]
      ])].map((id) => this.route.snapshot.data.organisation
        .find((organisation) => organisation.id === id));
    }

    this.fields[5].options = organisations;
  }

  protected persist(items?: { [key: string]: CrudModel }): Observable<any> {
    const schedules = this.diff('schedules', items);
    const tags = this.diff('tags', items);
    const targets = this.diff('targetGroups', items);

    this.item.addressId = this.value('address', items).id;
    this.item.categoryId = this.value('category', items).id;
    this.item.organisationId = this.value('organisation', items).id;

    const provider = this.model['provider'];
    return super.persist(items).pipe(mergeMap((i) => forkJoin([of(i)].concat(
      ...schedules.add.map((s) => provider.pasteSchedules(i.id, [s])),
      ...schedules.del.map((s) => provider.unlinkSchedule(i.id, s.id)),
      ...tags.add.map((t) => provider.pasteTags(i.id, [t])),
      ...tags.del.map((t) => provider.unlinkTag(i.id, t.id)),
      ...targets.add.map((t) => provider.linkTargetGroups(i.id, [t.id])),
      ...targets.del.map((t) => provider.unlinkTargetGroup(i.id, t.id))
    )).pipe(map((results) => results.shift()))));
  }

}
