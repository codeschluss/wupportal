import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { StaticPageModel, StaticPageProvider, TokenProvider, TranslationProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { ImageFieldComponent } from '../fields/image.field';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'static-page-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n>content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'tagId'">
          <i18n>tagId</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n>title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'titleImage'">
          <i18n>titleImage</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class StaticPageFormComponent
  extends BaseForm<StaticPageModel> {

  public fields: FormField[] = [
    {
      name: 'tagId',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'title',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: EditorFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'titleImage',
      input: ImageFieldComponent
    }
  ];

  public model: Type<StaticPageModel> = StaticPageModel;

  public constructor(
    private staticPageProvider: StaticPageProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  protected cascade(item: StaticPageModel): Observable<any> {
    const links = [];

    const image = this.group.get('titleImage').value;
    links.push(this.staticPageProvider.pasteImage(item.id, image));

    const images = this.updated('images');
    if (images.add.length) { links.push(this.staticPageProvider
      .pasteImages(item.id, images.add)); }
    if (images.del.length) { links.push(this.staticPageProvider
      .unlinkImages(item.id, images.del.map((i) => i.id))); }

    const videos = this.updated('videos');
    if (videos.add.length) { links.push(this.staticPageProvider
      .pasteVideos(item.id, videos.add)); }
    if (videos.del.length) { links.push(this.staticPageProvider
      .unlinkVideos(item.id, videos.del.map((i) => i.id))); }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
