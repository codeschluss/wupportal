import { Component, Type } from '@angular/core';
import { ImageModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { AvatarFieldComponent } from '../fields/avatar.field';

@Component({
  selector: 'avatar-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'avatar'">
          <i18n>avatar</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class AvatarFormComponent
  extends BaseForm<ImageModel> {


  public fields: FormField[] = [
    {
      name: 'avatar',
      input: AvatarFieldComponent
    }
  ];

  public model: Type<ImageModel> = ImageModel;

  protected ngPostInit(): void {
    this.fields[0].value = this.item?.id ? this.item : null;
  }

}
