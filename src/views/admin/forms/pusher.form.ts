import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel, TokenProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { MessageProvider } from '../../../base/providers/message.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { StringFieldComponent } from '../fields/string.field';
import { TextareaFieldComponent } from '../fields/textarea.field';

@Component({
  selector: 'pusher-form',
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

export class PusherFormComponent
  extends BaseForm<CrudModel> {

  public item: any;

  public fields: FormField[] = [
    {
      name: 'title',
      input: StringFieldComponent,
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
    console.log(this.group.value);

    return EMPTY;
  }

}
