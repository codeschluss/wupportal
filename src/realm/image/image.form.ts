import { Component, Type } from '@angular/core';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { ImageModel } from './image.model';

@Component({
  selector: 'image-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'images'">
          <i18n i18n="@@images">images</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ImageFormComponent extends BaseForm<ImageModel> {

  public fields: FormField[] = [
    // {
    //   name: 'images',
    //   input: UploadFieldComponent
    // }
    {
      name: 'images',
      input: StringFieldComponent,
      multi: true
    }
  ];

  public model: Type<ImageModel> = ImageModel;

}
