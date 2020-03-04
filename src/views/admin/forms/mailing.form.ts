import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { CrudModel } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { StringFieldComponent } from '../fields/string.field';

@Component({
  selector: 'mailing-form',
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

export class MailingFormComponent
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
      input: EditorFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<CrudModel> = Object as any;

  public persist(): Observable<any> {
    console.log(this.group.value);

    return EMPTY;
  }

}
