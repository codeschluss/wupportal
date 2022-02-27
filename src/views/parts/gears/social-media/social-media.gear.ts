import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CoreSettings, SocialMediaModel, SocialMediaProvider } from '../../../../core';

@Component({
  selector: 'social-media-gear',
  styleUrls: ['social-media.gear.sass'],
  templateUrl: 'social-media.gear.html'
})

export class SocialMediaGearComponent
  implements OnInit {

  public socialMedia: Observable<SocialMediaModel[]>;

  public get rssFeed(): string {
    return this.settings.api.rootUrl + '/rss';
  }

  public constructor(
    private settings: CoreSettings,
    private socialMediaProvider: SocialMediaProvider
  ) { }

  public ngOnInit(): void {
    this.socialMedia = this.socialMediaProvider.readAll().pipe(
      catchError(() => of([]))
    );
  }

}
