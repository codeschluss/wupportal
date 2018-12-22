import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { TagModel } from './tag.model';

@Component({
  selector: 'tag-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'description'"
          i18n="@@description">description</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@name">name</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class TagFormComponent extends BaseForm<TagModel> {

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
    }
  ];

  public model: Type<TagModel> = TagModel;

}
