import { Component } from '@angular/core';
import { InfopageModel } from '../../../../core';
import { BaseCard } from '../base.card';

@Component({
  selector: 'infopage-card',
  styleUrls: ['../base.card.sass', 'infopage.card.sass'],
  templateUrl: 'infopage.card.html'
})

export class InfopageCardComponent
  extends BaseCard<InfopageModel> { }
