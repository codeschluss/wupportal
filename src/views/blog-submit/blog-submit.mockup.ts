import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  styles: [`
  `],
  template: `
  <main>
  <p>Im the one who mocks</p>
</main>
  `
})

export class BlogSubmitComponent { }

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '**',
      pathMatch: 'full',
      component: BlogSubmitComponent
    }
  ])]
})

export class BlogSubmitRouter { }

@NgModule({
  declarations: [
    BlogSubmitComponent
  ],
  imports: [
    BlogSubmitRouter
  ]
})

export class BlogSubmitModule { }
