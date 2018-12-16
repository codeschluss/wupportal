import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { ImageModel } from './image.model';

@Component({
  selector: 'schedule-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'images'" i18n="@@images">images</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class ImageFormComponent extends BaseForm<ImageModel> {

  public fields: FormField[] = [
    {
      name: 'images',
      // input: ImageFieldComponent,
      input: StringFieldComponent,
      multi: true
    }
  ];

  public model: Type<ImageModel> = ImageModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
