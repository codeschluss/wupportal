import { Component } from '@angular/core';
import { InfopageModel } from '../../../../base/models/infopage.model';
import { BaseCard } from '../base.card';

@Component({
  selector: 'infopage-card',
  styleUrls: ['../base.card.scss', 'infopage.card.scss'],
  templateUrl: 'infopage.card.html'
})

export class InfopageCardComponent extends BaseCard<InfopageModel> { }
