import { Component, OnInit } from '@angular/core';
import { Headers, PlatformProvider } from '@wooportal/core';
import { RouterExtensions } from 'nativescript-angular';
import { take } from 'rxjs/operators';
import { Label } from 'tns-core-modules/ui/label';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  styleUrls: ['error.netsplit.scss'],
  templateUrl: 'error.netsplit.html'
})

export class ErrorNetsplitComponent implements OnInit {

  public constructor(
    public router: RouterExtensions,
    private headers: Headers,
    private page: Page,
    private platformProvider: PlatformProvider
  ) { }

  public ngOnInit(): void {
    this.headers.name.pipe(take(1)).subscribe((title) => {
      const label = new Label();
      label.fontSize = 20;
      label.horizontalAlignment = 'left';
      label.text = title;
      label.textAlignment = 'left';
      label.width = { unit: '%', value: 100 };
      this.page.actionBar.titleView = label;
    });

    switch (this.platformProvider.name) {
      case 'iOS':
        this.router.frameService.getFrame()
          .viewController.visibleViewController.navigationItem
          .setHidesBackButtonAnimated(true, false);
        break;
    }
  }

}
