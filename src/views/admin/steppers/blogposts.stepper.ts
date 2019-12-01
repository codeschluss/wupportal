import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BaseStepper, FormStep } from '@wooportal/forms';
import { BlogpostModel } from '../../../realm/models/blogpost.model';
import { BlogpostFormComponent } from '../forms/blogpost.form';
import { ImageFormComponent } from '../forms/image.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'blogpost-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createBlogpost">createBlogpost</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editBlogpost">editBlogpost</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'images'">
          <i18n i18n="@@images">images</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class BlogpostStepperComponent
  extends BaseStepper<BlogpostModel> {

  public root: string = 'blogs';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: BlogpostFormComponent
    },
    {
      name: 'images',
      form: ImageFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(BlogpostModel)
    .with('activity')
    .with('images')
    .with('translations').yield('language');

  protected model: Type<BlogpostModel> = BlogpostModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

  protected get path(): string {
    return 'blogposts';
  }

}
