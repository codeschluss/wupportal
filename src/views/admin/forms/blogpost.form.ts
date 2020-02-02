import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Box, TokenProvider } from '@wooportal/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivityModel } from '../../../base/models/activity.model';
import { BlogpostModel } from '../../../base/models/blogpost.model';
import { BlogpostProvider } from '../../../base/providers/blogpost.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { SelectFieldComponent } from '../fields/select.field';
import { StringFieldComponent } from '../fields/string.field';

@Component({
  selector: 'blogpost-form',
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

export class BlogpostFormComponent
  extends BaseForm<BlogpostModel> {

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
      input: EditorFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<BlogpostModel> = BlogpostModel;

  public constructor(
    private blogpostProvider: BlogpostProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public persist(): Observable<any> {
    this.item.activityId = (this.group.get('activity').value || { }).id;

    return super.persist();
  }

  protected ngPostInit(): void {
    this.route.snapshot.data.activity = this.route.snapshot.data.activity
      .map((a) => Object.assign(a, { name: `${a.name} (${a.description})` }));
  }

  protected cascade(item: BlogpostModel): Observable<any> {
    const links = [];

    const images = this.updated('images');
    if (images.add.length) { links.push(this.blogpostProvider
      .pasteImages(item.id, images.add)); }
    if (images.del.length) { links.push(this.blogpostProvider
      .unlinkImages(item.id, images.del.map((i) => i.id))); }

    if (this.item.id) {
      const aId = this.item.activity && this.item.activity.id;
      if (aId !== this.item.activityId) { links.push(this.blogpostProvider
        .relinkActivity(item.id, Box(this.item.activityId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
