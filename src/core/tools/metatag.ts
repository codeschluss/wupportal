import { Injectable } from '@angular/core';
import { Meta as MetaService, Title as TitleService } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrudModel } from '../crud/crud.model';
import { SessionProvider } from '../session/session.provider';
import { CoreSettings } from './settings';

type EnrichedModel = CrudModel
  & { address?: any }
  & { content?: any }
  & { description?: string }
  & { images?: any[] }
  & { keywords?: any[] };

@Injectable({
  providedIn: 'root'
})

export class MetatagService {

  private static defaultTags: {
    base: string;
    city: string;
    slug: string;
    spot: [string, string];
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
    const region = this.settings.defaults.language;

    return {
      card: 'summary',
      description: MetatagService.defaultTags.slug,
      'geo.position': MetatagService.defaultTags.spot.join('; '),
      'geo.placename': MetatagService.defaultTags.city,
      image: this.settings.app.baseUrl + '/images/icon.png',
      keywords: '',
      language: lang,
      locale: `${region.toLocaleLowerCase()}_${lang.toUpperCase()}`,
      site_name: this.base.value,
      type: 'website',
      url: this.settings.app.baseUrl + this.router.url
    };
  }

  public constructor(
    private metaService: MetaService,
    private router: Router,
    private sessionProvider: SessionProvider,
    private settings: CoreSettings,
    private titleService: TitleService
  ) {
    this.base = new BehaviorSubject<string>(this.settings.defaults.title);
    this.title = new BehaviorSubject<string>(this.base.value);
  }

  public init(defaultTags: any): void {
    this.base.next(defaultTags.base);
    MetatagService.defaultTags = defaultTags;
  }

  public setModel(model: EnrichedModel): void {
    this.title.next(`${model.label} | ${this.base.value}`);
    this.titleService.setTitle(this.title.value);
    this.updateMeta(this.metaModel(model));
  }

  public setTitle(title: string | null): void {
    this.title.next(title ? `${title} | ${this.base.value}` : this.base.value);
    this.titleService.setTitle(this.title.value);
    this.updateMeta(this.metaData(title));
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
      title: model.label
    });

    if (model.address) {
      Object.assign(tags, {
        'geo.position': `${model.address.latitude}; ${model.address.longitude}`,
        'geo.placename': `${model.address.place} ${model.address.suburb.label}`
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
        keywords: model.keywords.map((k) => k.label).join(', ')
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
      property: `og:${key}`
    }));

    keys.twitter.forEach((key) => this.metaService.updateTag({
      content: tags[key],
      name: `twitter:${key}`
    }));
  }

}
