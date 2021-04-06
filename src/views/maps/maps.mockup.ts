import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlatformProvider } from '../../core';

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
      background-color: #e0e0e0;
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
      <fa-icon icon="map-marked-alt"></fa-icon>
    </main>
  `
})

export class MapsComponent
  implements OnInit {

  public constructor(
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('embed')) {
      this.platformProvider.document.body.classList.add('embedded');
    }
  }

}

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '**',
      pathMatch: 'full',
      component: MapsComponent
    }
  ])]
})

export class MapsRouter { }

@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    FontAwesomeModule,
    MapsRouter
  ]
})

export class MapsModule { }
