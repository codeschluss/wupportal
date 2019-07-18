import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  styles: [`
    fa-icon { color: rgba(0, 0, 0, .87); font-size: 4rem; }
    main {
      background-color: rgba(0, 0, 0, .12);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  `],
  template: `
    <main fxLayout="row" fxLayoutAlign="center center">
      <fa-icon icon="map-marked-alt"></fa-icon>
    </main>
  `
})

export class MapsComponent implements OnInit {

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.route.snapshot.queryParams.embed === 'true') {
      this.document.body.classList.add('embedded');
    }
  }

}


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    { path: '', component: MapsComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
  ])]
})

export class MapsRouter { }


@NgModule({
  declarations: [MapsComponent],
  imports: [FlexLayoutModule, FontAwesomeModule, MapsRouter]
})

export class MapsModule { }
