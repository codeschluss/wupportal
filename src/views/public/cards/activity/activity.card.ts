import { Component, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import * as ColorConvert from 'color-convert';
import { ActivityModel } from '../../../../base/models/activity.model';
import { BaseCard } from '../base.card';

@Component({
  selector: 'activity-card',
  styleUrls: ['../base.card.scss', 'activity.card.scss'],
  templateUrl: 'activity.card.html'
})

export class ActivityCardComponent extends BaseCard<ActivityModel> {

  @ViewChild(MatRipple, { static: true })
  public ripple: MatRipple;

  public colors(base: string): Partial<CSSStyleDeclaration> {
    const rgb = ColorConvert.keyword.rgb(base) || ColorConvert.hex.rgb(base);
    const light = rgb[0] + rgb[1] + rgb[2] > 382;

    const burned = ColorConvert.rgb.hex(
      Math.min(255, rgb[0] + 25),
      Math.min(255, rgb[1] + 25),
      Math.min(255, rgb[2] + 25)
    );

    const dimmed = ColorConvert.rgb.hex(
      Math.max(0, rgb[0] - 25),
      Math.max(0, rgb[1] - 25),
      Math.max(0, rgb[2] - 25)
    );

    const one = light ? burned : dimmed;
    const two = !light ? burned : dimmed;

    return {
      backgroundColor: base,
      backgroundImage: `linear-gradient(45deg, #${one}, #${two})`,
      color: light ? '#000' : '#FFF'
    };
  }

}
