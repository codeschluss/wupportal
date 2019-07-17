import { Component } from '@angular/core';
import { PageModel } from '../../../../realm/models/page.model';
import { BaseCard } from '../base.card';

@Component({
  selector: 'infopage-card',
  styleUrls: ['infopage.card.scss'],
  templateUrl: 'infopage.card.html'
})

export class InfopageCardComponent extends BaseCard<PageModel> { }
