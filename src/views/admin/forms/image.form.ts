import { Component, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { ImageFieldComponent } from '../fields/image.field';

@Component({
  selector: 'image-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'images'">
          <i18n>images</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ImageFormComponent
  extends BaseForm<ImageModel> {

  public fields: FormField[] = [
    {
      name: 'images',
      input: ImageFieldComponent
    }
  ];

  public model: Type<ImageModel> = ImageModel;

  public persist(): Observable<any> {
    return of(this.group.get('images').value);
  }

  public reset(): void {
    this.group.reset({ images: this.item || [] });
  }

  protected ngPostInit(): void {
    this.fields[0].value = Array.isArray(this.item) ? this.item : [];
  }

}
