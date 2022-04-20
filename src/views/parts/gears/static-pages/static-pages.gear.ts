import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LabelResolver, StaticPageModel, StaticPageProvider } from '../../../../core';

@Component({
  selector: 'static-pages-gear',
  styleUrls: ['static-pages.gear.sass'],
  templateUrl: 'static-pages.gear.html'
})

export class StaticPagesGearComponent
  implements OnInit {

  public staticPages: Observable<StaticPageModel[]>;

  public constructor(
    private labelResolver: LabelResolver,
    private router: Router,
    private staticPageProvider: StaticPageProvider
  ) { }

  public ngOnInit(): void {
    this.staticPages = this.staticPageProvider.readAll();
  }

  public active(item: StaticPageModel): boolean {
    return this.router.url === '/' + item.tagId;
  }

  public i18n(item: StaticPageModel): string {
    return this.labelResolver.lookup(item.tagId);
  }

}
