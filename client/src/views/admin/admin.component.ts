import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionProvider } from '@portal/core';

@Component({
  template: `<router-outlet></router-outlet>`
})

export class AdminComponent {

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionProvider: SessionProvider
  ) {
    const token = this.route.snapshot.data.session.accessToken;
    console.log(this.sessionProvider);

    if (!this.route.snapshot.firstChild) {
      this.router.navigate(['account', token.id], { relativeTo: this.route });
    }
  }

}
