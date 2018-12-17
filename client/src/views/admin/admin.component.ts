import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pathfinder } from '@portal/core';
import { AccountPanelComponent } from './account/account.panel';

@Component({
  template: `<router-outlet></router-outlet>`
})

export class AdminComponent implements OnInit {

  public constructor(
    private pathfinder: Pathfinder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    if (!this.route.snapshot.firstChild) {
      this.router.navigate(this.pathfinder.to(AccountPanelComponent)
        .concat(this.route.snapshot.data.session.accessToken.id));
    }
  }

}
