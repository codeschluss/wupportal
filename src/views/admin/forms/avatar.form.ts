import { Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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

  public reset(): void {
    this.group.reset({ images: this.item || [] });
  }

  protected ngPostInit(): void {
    this.fields[0].value = Array.isArray(this.item) ? this.item : [];
  }

  public persist(): Observable<any> {
    return this.userProvider.addAvatar(this.item.id, this.group.get('avatar').value)
  }


}
