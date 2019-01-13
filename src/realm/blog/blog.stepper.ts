import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { TranslationFormComponent } from '../translation/translation.form';
import { BlogFormComponent } from './blog.form';
import { BlogModel } from './blog.model';

@Component({
  selector: 'blog-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createBlog">createBlog</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editBlog">editBlog</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'blog'">
          <i18n i18n="@@blog">blog</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class BlogStepperComponent
  extends BaseStepper<BlogModel> {

  public root: string = 'blog';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: BlogFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(BlogModel)
    .with('activity');

  protected model: Type<BlogModel> = BlogModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('title').value;
  }

}
