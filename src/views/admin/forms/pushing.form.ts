import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel, TokenProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageProvider } from '../../../base/providers/message.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';
import { TextareaFieldComponent } from '../fields/textarea.field';

@Component({
  selector: 'pushing-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
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

export class PushingFormComponent
  extends BaseForm<CrudModel> {

  public item: any;

  public fields: FormField[] = [
    {
      name: 'title',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: TextareaFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<CrudModel> = Object as any;

  public constructor(
    private messageProvider: MessageProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public persist(): Observable<any> {
    return this.messageProvider.push({
      content: this.group.get('content').value,
      title: this.group.get('title').value
    }).pipe(map(() => this.reset()));
  }

}
