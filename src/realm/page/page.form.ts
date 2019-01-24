import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { Box } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TopicModel } from '../topic/topic.model';
import { TranslationBase } from '../translation/translation.base';
import { PageModel } from './page.model';

@Component({
  selector: 'page-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n i18n="@@content">content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'topic'">
          <i18n i18n="@@topic">topic</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class PageFormComponent
  extends TranslationBase<PageModel> {

  public fields: FormField[] = [
    {
      name: 'title',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'topic',
      input: SelectFieldComponent,
      label: 'name',
      model: TopicModel,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    }
  ];

  public model: Type<PageModel> = PageModel;

  public persist(): Observable<any> {
    this.item.topicId = this.group.get('topic').value.id;

    return super.persist();
  }

  protected cascade(item: PageModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    if (this.item.id) {
      const tpicID = this.item.topic && this.item.topic.id;
      if (tpicID !== this.item.topicId) { links.push(provider
        .relinkTopic(item.id, Box(this.item.topicId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
