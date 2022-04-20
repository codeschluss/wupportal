import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  styles: [`
    @keyframes fade {
      from { opacity: .36; }
      to { opacity: .87; }
    }
    fa-icon {
      animation: fade .5s infinite alternate;
    }
    main {
      align-items: center;
      bottom: 0;
      color: rgba(0, 0, 0, .87);
      display: flex;
      font-size: 4rem;
      height: 100%;
      justify-content: center;
      left: 0;
      max-width: 100% !important;
      padding: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  `],
  template: `
    <main>
      <fa-icon icon="comments"></fa-icon>
    </main>
  `
})

export class UblogComponent { }

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '**',
      pathMatch: 'full',
      component: UblogComponent
    }
  ])]
})

export class UblogRouter { }

@NgModule({
  declarations: [
    UblogComponent
  ],
  imports: [
    FontAwesomeModule,
    UblogRouter
  ]
})

export class UblogModule { }
