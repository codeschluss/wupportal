import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
import * as marked from 'marked';
import { BlogModel } from '../../../../realm/models/blog.model';
import { BaseCard } from '../base.card';

@Component({
  selector: 'blogpost-card',
  styleUrls: ['../base.card.scss', 'blogpost.card.scss'],
  templateUrl: 'blogpost.card.html'
})

export class BlogpostCardComponent extends BaseCard<BlogModel> {

  public get preview(): string {
    const content = marked(this.item.content).replace(/<[^>]*>/g, '');
    let preview = '';

    switch (this.platformProvider.type) {
      case 'Native':
        // TODO: native html decoding
        break;

      case 'Online':
        const decoder = this.document.createElement('textarea');
        decoder.innerHTML = content;
        preview = decoder.value;
        break;
    }

    return preview.length > 500
      ? preview.substr(0, 500) + '...'
      : preview;
  }

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private platformProvider: PlatformProvider,
    router: Router,
  ) {
    super(router);
  }

}
