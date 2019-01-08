import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
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
      input: StringFieldComponent,
      type: 'tel'
    },
    {
      name: 'mail',
      input: StringFieldComponent,
      tests: [
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
      ],
      type: 'email'
    },
    {
      name: 'organisation',
      input: SelectFieldComponent,
      label: 'name',
      model: OrganisationModel,
      tests: [Validators.required]
    },
    {
      name: 'category',
      input: SelectFieldComponent,
      label: 'name',
      model: CategoryModel,
      tests: [Validators.required]
    },
    {
      name: 'targetGroups',
      input: SelectFieldComponent,
      label: 'name',
      model: TargetGroupModel,
      multi: true
    },
    {
      name: 'tags',
      input: ChipListFieldComponent,
      label: 'name',
      model: TagModel
    }
  ];

  public model: Type<ActivityModel> = ActivityModel;

  public persist(): Observable<any> {
    const schedules = this.updated('schedules');
    const tags = this.updated('tags');
    const targets = this.updated('targetGroups');

    this.item.addressId = this.group.get('address').value.id;
    this.item.categoryId = this.group.get('category').value.id;
    this.item.organisationId = this.group.get('organisation').value.id;

    return super.persist().pipe(mergeMap((i) => forkJoin([of(i)].concat(
      ...schedules.add.map((s) => this.provider.pasteSchedules(i.id, [s])),
      ...schedules.del.map((s) => this.provider.unlinkSchedule(i.id, s.id)),
      ...tags.add.map((t) => this.provider.pasteTags(i.id, [t])),
      ...tags.del.map((t) => this.provider.unlinkTag(i.id, t.id)),
      ...targets.add.map((t) => this.provider.linkTargetGroups(i.id, [t.id])),
      ...targets.del.map((t) => this.provider.unlinkTargetGroup(i.id, t.id))
    )).pipe(
      map((results) => results.shift()),
      mergeMap((r) => this.cascade(r, 'addresId', 'relinkAddress')),
      mergeMap((r) => this.cascade(r, 'categoryId', 'relinkCategory')),
      mergeMap((r) => this.cascade(r, 'organisatioId', 'relinkOrganisation'))
    )));
  }

  protected ngPostInit(): void {
    const claim = this.token[ClientPackage.config.jwtClaims.superUser];

    this.fields[5].options = this.token[claim] ? this.fields[5].options : [
      ...this.token[ClientPackage.config.jwtClaims.organisationAdmin],
      ...this.token[ClientPackage.config.jwtClaims.organisationUser]
    ].map((id) => this.fields[5].options.find((o) => o.id === id));
  }

}
