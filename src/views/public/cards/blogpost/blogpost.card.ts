import { Component } from '@angular/core';
import { BlogpostModel } from '../../../../core';
import { BaseCard } from '../base.card';

@Component({
  selector: 'blogpost-card',
  styleUrls: ['../base.card.sass', 'blogpost.card.sass'],
  templateUrl: 'blogpost.card.html'
})

export class BlogpostCardComponent
  extends BaseCard<BlogpostModel> {

  public get preview(): string {
    const preview = this.item.content
      .replace(/&#\d+;/g, (i) => String.fromCharCode(i.match(/\d+/g)[0] as any))
      .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');

    return preview.length > 500
      ? preview.substr(0, 500) + '...'
      : preview;
  }

}
