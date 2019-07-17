import { Component } from '@angular/core';
import * as colorConvert from 'color-convert';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BaseCard } from '../base.card';

@Component({
  selector: 'activity-card',
  styleUrls: ['activity.card.scss'],
  templateUrl: 'activity.card.html'
})

export class ActivityCardComponent extends BaseCard<ActivityModel> {

  public readonly dateFormat: string = 'dd.MM.yyyy, HH:mm';

  public colors(base: string): Partial<CSSStyleDeclaration> {
    const rgb = colorConvert.keyword.rgb(base) || colorConvert.hex.rgb(base);
    const light = rgb[0] + rgb[1] + rgb[2] > 382;

    const burned = colorConvert.rgb.hex([
      Math.min(255, rgb[0] + 25),
      Math.min(255, rgb[1] + 25),
      Math.min(255, rgb[2] + 25)
    ]);

    const dimmed = colorConvert.rgb.hex([
      Math.max(0, rgb[0] - 25),
      Math.max(0, rgb[1] - 25),
      Math.max(0, rgb[2] - 25)
    ]);

    const one = light ? burned : dimmed;
    const two = !light ? burned : dimmed;

    return {
      backgroundColor: base,
      backgroundImage: `linear-gradient(45deg, #${one}, #${two})`,
      color: light ? '#000' : '#FFF'
    };
  }

}
