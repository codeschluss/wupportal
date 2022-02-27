import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LabelResolver, LoadingProvider } from '../../../core';

@Component({
  selector: 'header-component',
  styleUrls: ['header.component.sass'],
  templateUrl: 'header.component.html'
})

export class HeaderComponent
  implements OnInit {

  public loading: Observable<number>;

  public constructor(
    private labelResolver: LabelResolver,
    private loadingProvider: LoadingProvider
  ) { }

  public ngOnInit(): void {
    this.loading = this.loadingProvider.value;
  }

  public i18n(text: string): string {
    return this.labelResolver.lookup(text);
  }

}
