import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { Box } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivityModel } from '../activity/activity.model';
import { TranslationBase } from '../translation/translation.base';
import { BlogModel } from './blog.model';

@Component({
  selector: 'blog-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'activity'">
          <i18n i18n="@@activity">activity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'content'">
          <i18n i18n="@@content">content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class BlogFormComponent
  extends TranslationBase<BlogModel> {

  public fields: FormField[] = [
    {
      name: 'title',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'activity',
      input: SelectFieldComponent,
      label: 'name',
      model: ActivityModel
    },
    {
      name: 'content',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    }
  ];

  public model: Type<BlogModel> = BlogModel;

  public persist(): Observable<any> {
    this.item.activityId = (this.group.get('activity').value || { }).id;

    return super.persist();
  }

  protected ngPostInit(): void {
    this.route.snapshot.data.activity = this.route.snapshot.data.activity
      .map((a) => Object.assign(a, { name: `${a.name} (${a.description})` }));
  }

  protected cascade(item: BlogModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    if (this.item.id) {
      const actyID = this.item.activity && this.item.activity.id;
      if (actyID !== this.item.activityId) { links.push(provider
        .relinkActivity(item.id, Box(this.item.activityId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
