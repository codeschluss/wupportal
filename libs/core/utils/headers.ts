import { Injectable } from '@angular/core';
import { Meta as MetaService, Title as TitleService } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CrudModel } from '@wooportal/core/crud/crud.model';
import { PlatformProvider } from '@wooportal/core/platform/platform.provider';
import { SessionProvider } from '@wooportal/core/session/session.provider';
import { CoreSettings } from '@wooportal/core/utils/settings';
import { BehaviorSubject, Observable } from 'rxjs';

type EnrichedModel = CrudModel
  & { address?: any }
  & { content?: any }
  & { description?: string }
  & { images?: any[] }
  & { keywords?: any[] };

@Injectable({ providedIn: 'root' })
export class Headers {

  private static defaultTags: {
    base: string,
    city: string,
    slug: string,
    spot: [string, string]
  } = {
    base: '',
    city: '',
    slug: '',
    spot: ['', '']
  };

  private base: BehaviorSubject<string>;

  private title: BehaviorSubject<string>;

  private readonly metaTags = [
    'description',
    'geo.position',
    'geo.placename',
    'keywords',
    'language'
  ];

  private readonly openGraphTags = [
    'description',
    'image',
    'locale',
    'site_name',
    'title',
    'type',
    'url'
  ];

  private readonly twitterTags = [
    'card',
    'description',
    'image',
    'title'
  ];

  public get name(): Observable<string> {
    return this.base.asObservable();
  }

  public get value(): Observable<string> {
    return this.title.asObservable();
  }

  private get defaultTags(): object {
    const lang = this.sessionProvider.getLanguage();
    const region = this.coreSettings.defaultLanguage;

    return {
      card: 'summary',
      description: Headers.defaultTags.slug,
      'geo.position': Headers.defaultTags.spot.join('; '),
      'geo.placename': Headers.defaultTags.city,
      image: this.coreSettings.appUrl + '/images/icon.png',
      keywords: '',
      language: lang,
      locale: `${region.toLocaleLowerCase()}_${lang.toUpperCase()}`,
      site_name: this.base.value,
      type: 'website',
      url: this.coreSettings.appUrl + this.router.url
    };
  }

  public constructor(
    private coreSettings: CoreSettings,
    private metaService: MetaService,
    private platform: PlatformProvider,
    private router: Router,
    private sessionProvider: SessionProvider,
    private titleService: TitleService
  ) {
    this.base = new BehaviorSubject<string>(this.coreSettings.defaultTitle);
    this.title = new BehaviorSubject<string>(this.base.value);
  }

  public init(defaultTags: any): void {
    this.base.next(defaultTags.base);
    Headers.defaultTags = defaultTags;
  }

  public setModel(model: EnrichedModel): void {
    this.title.next(`${model.name} | ${this.base.value}`);

    if (['Server', 'Web'].includes(this.platform.name)) {
      this.titleService.setTitle(this.title.value);
      this.updateMeta(this.metaModel(model));
    }
  }

  public setTitle(title: string | null): void {
    this.title.next(title ? `${title} | ${this.base.value}` : this.base.value);

    if (['Server', 'Web'].includes(this.platform.name)) {
      this.titleService.setTitle(this.title.value);
      this.updateMeta(this.metaData(title));
    }
  }

  private metaData(title: string | null): object {
    const tags = Object.assign(this.defaultTags, {
      title: title || this.base.value
    });

    return tags;
  }

  private metaModel(model: EnrichedModel): object {
    const tags = Object.assign(this.defaultTags, {
      description: model.content || model.description,
      title: model.name
    });

    if (model.address) {
      Object.assign(tags, {
        'geo.position': `${model.address.latitude}; ${model.address.longitude}`,
        'geo.placename': `${model.address.place} ${model.address.suburb.name}`
      });
    }

    if (model.images && model.images.length) {
      Object.assign(tags, {
        image:
          `data:${model.images[0].mimeType};base64,${model.images[0].imageData}`
      });
    }

    if (model.keywords && model.keywords.length) {
      Object.assign(tags, {
        keywords: model.keywords.map((k) => k.name).join(', ')
      });
    }

    return tags;
  }

  private updateMeta(tags: object): void {
    const keys = {
      meta: Object.keys(tags).filter((k) => this.metaTags.includes(k)),
      ograph: Object.keys(tags).filter((k) => this.openGraphTags.includes(k)),
      twitter: Object.keys(tags).filter((k) => this.twitterTags.includes(k))
    };

    keys.meta.forEach((key) => this.metaService.updateTag({
      content: tags[key],
      name: key
    }));

    keys.ograph.forEach((key) => this.metaService.updateTag({
      content: tags[key],
      property: `og:${key}`,
    }));

    keys.twitter.forEach((key) => this.metaService.updateTag({
      content: tags[key],
      name: `twitter:${key}`
    }));
  }

}
