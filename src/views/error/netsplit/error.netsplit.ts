import { AfterViewInit, Component } from '@angular/core';
import { MetatagService, PlatformProvider } from '../../../core';

@Component({
  styleUrls: ['error.netsplit.sass'],
  templateUrl: 'error.netsplit.html'
})

export class ErrorNetsplitComponent
  implements AfterViewInit {

  public constructor(
    public metatagService: MetatagService,
    public platformProvider: PlatformProvider
  ) { }

  public ngAfterViewInit(): void {
    if (['android', 'ios'].includes(this.platformProvider.name)) {
      this.platformProvider.navigator.splashscreen?.hide();
    }
  }

}
