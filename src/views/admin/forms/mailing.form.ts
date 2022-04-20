import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudModel, MessageProvider, TokenProvider, TranslationProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'mailing-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n>content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n>title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class MailingFormComponent
  extends BaseForm<CrudModel> {

  declare public item: any;

  public fields: FormField[] = [
    {
      name: 'title',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: EditorFieldComponent,
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
    return this.messageProvider.mail({
      content: this.group.get('content').value,
      title: this.group.get('title').value
    }).pipe(map(() => this.reset()));
  }

}
