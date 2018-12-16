import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `<router-outlet></router-outlet>`
})

export class AdminComponent {

  public constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (!this.route.snapshot.firstChild) {
      const token = this.route.snapshot.data.session.accessToken;
      this.router.navigate(['account', token.id], { relativeTo: this.route });
    }
  }

}
