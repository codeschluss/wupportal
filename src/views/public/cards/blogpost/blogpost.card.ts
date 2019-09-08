import { Component } from '@angular/core';
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
    const preview = marked(this.item.content)
      .replace(/&#\d+;/g, (i) => String.fromCharCode(i.match(/\d+/g)[0]))
      .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');

    return preview.length > 500
      ? preview.substr(0, 500) + '...'
      : preview;
  }

}
