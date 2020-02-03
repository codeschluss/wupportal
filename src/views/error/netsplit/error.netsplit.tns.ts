import { Component, OnInit } from '@angular/core';
import { DeviceProvider } from '@wooportal/app';
import { Headers } from '@wooportal/core';
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
    private deviceProvider: DeviceProvider,
    private headers: Headers,
    private page: Page
  ) { }

  public ngOnInit(): void {
    const frame = this.router.frameService.getFrame();

    this.headers.name.pipe(take(1)).subscribe((title) => {
      const label = new Label();
      label.text = title;
      label.addCss(`
        Label {
          font-size: 20;
          font-weight: 500;
          horizontal-align: left;
          text-align: left;
          width: 100%;
        }
      `);

      this.page.actionBar.titleView = label;
    });

    switch (this.deviceProvider.notation) {
      case 'iOS':
        if (frame.viewController.visibleViewController) {
          frame.viewController.visibleViewController.navigationItem
            .setHidesBackButtonAnimated(true, false);
        }
        break;
    }
  }

}
