import { Component, ElementRef, Optional, Type, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CrudJoiner, Headers, PlatformProvider } from '@wooportal/core';
import { ExpandCompat } from 'src/views/shared/compat/expand/expand.compat.i';
import { WebView } from 'tns-core-modules/ui/web-view';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { ScheduleModel } from '../../../../realm/models/schedule.model';
import { ClientPackage } from '../../../../utils/package';
import { geolocation } from '../../../shared/shared.imports';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'activity.object.scss'],
  templateUrl: 'activity.object.html'
})

export class ActivityObjectComponent extends BaseObject<ActivityModel> {

  public schedule: ScheduleModel;

  public source: SafeResourceUrl | string;

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel, {
    required: true
  }).with('address').yield('suburb')
    .with('blogs')
    .with('category')
    .with('images')
    .with('organisation').yield('address').yield('suburb')
    .with('organisation').yield('images')
    .with('provider')
    .with('schedules')
    .with('tags')
    .with('targetGroups');

  protected model: Type<ActivityModel> = ActivityModel;

  protected path: string = 'activities';

  @ViewChild('webview', { read: ElementRef, static: false })
  private webview: ElementRef<WebView>;

  public constructor(
    @Optional() private sanitizer: DomSanitizer,
    i18n: I18n,
    platformProvider: PlatformProvider,
    route: ActivatedRoute,
    router: Router,
    headers: Headers
  ) {
    super(router, platformProvider, headers, i18n, route);
  }

  public reloader(expand: ExpandCompat): void {
    this.expanded(expand);

    if (this.platformProvider.name === 'iOS') {
      this.webview.nativeElement.reload();
    }
  }

  protected ngPostInit(): void {
    const url = `/mapview?embed&items=${this.item.id}`;

    switch (this.platformProvider.type) {
      case 'Native':
        geolocation.enableLocationRequest().catch(() => { });
        this.source = ClientPackage.config.defaults.appUrl + url + '&native';
        break;

      case 'Online':
        this.source = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
    }
  }

  protected ngPostViewInit(): void {
    if (this.platformProvider.type === 'Native') {
      let wv = this.webview.nativeElement as any;

      // tslint:disable-next-line
      if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
      // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

      switch (this.platformProvider.name) {
        case 'Android':
          wv = wv.android;
          wv.getSettings().setGeolocationEnabled(true);
          wv.getSettings().setJavaScriptEnabled(true);
          wv.setWebChromeClient(new this.platformProvider.chromeClient());
          break;
      }
    }
  }

}
