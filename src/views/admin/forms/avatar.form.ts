import { Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageModel, TokenProvider, TranslationProvider, UserProvider } from '../../../core';
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


  constructor(
    public route: ActivatedRoute,
    public tokenProvider: TokenProvider,
    public translationProvider: TranslationProvider,
    public userProvider: UserProvider) {
      super(route, tokenProvider, translationProvider);

  }
  
  protected ngPostInit(): void {
    this.fields[0].value = this.item;
  }

}
