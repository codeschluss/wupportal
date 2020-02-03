import { Component, ElementRef, Optional, Type, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { ApplicationSettings, DeviceProvider, GeoLocation } from '@wooportal/app';
import { CrudJoiner, Headers } from '@wooportal/core';
import { WebView } from 'tns-core-modules/ui/web-view';
import { ActivityModel } from '../../../../base/models/activity.model';
import { ScheduleModel } from '../../../../base/models/schedule.model';
import { ExpandComponent } from '../../../shared/expand/expand.component';
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
    private app: ApplicationSettings,
    @Optional() private sanitizer: DomSanitizer,
    i18n: I18n,
    deviceProvider: DeviceProvider,
    route: ActivatedRoute,
    router: Router,
    headers: Headers
  ) {
    super(router, deviceProvider, headers, i18n, route);
  }

  public reloader(expand: ExpandComponent): void {
    this.expanded(expand);

    if (this.deviceProvider.notation === 'iOS') {
      this.webview.nativeElement.reload();
    }
  }

  protected ngPostInit(): void {
    const url = `/mapview?embed&items=${this.item.id}`;

    switch (this.deviceProvider.platform) {
      case 'Native':
        GeoLocation.enableLocationRequest().catch(() => { });
        this.source = this.app.config.defaults.appUrl + url + '&native';
        break;

      case 'Online':
        this.source = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
    }
  }

  protected ngPostViewInit(): void {
    if (this.deviceProvider.platform === 'Native') {
      if (this.webview.nativeElement.isLoaded) {
        let wv = this.webview.nativeElement as any;

        switch (this.deviceProvider.notation) {
          case 'Android':
            wv = wv.android;
            wv.getSettings().setGeolocationEnabled(true);
            wv.getSettings().setJavaScriptEnabled(true);
            wv.setWebChromeClient(new this.deviceProvider.webChromeClient());
            break;
        }
      } else {
        this.webview.nativeElement.once('loaded', () => this.ngPostViewInit());
      }
    }
  }

}
