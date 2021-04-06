import { Component, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VideoModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { VideoFieldComponent } from '../fields/video.field';

@Component({
  selector: 'video-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'videos'">
          <i18n>videos</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class VideoFormComponent
  extends BaseForm<VideoModel> {

  public fields: FormField[] = [
    {
      name: 'videos',
      input: VideoFieldComponent
    }
  ];

  public model: Type<VideoModel> = VideoModel;

  public persist(): Observable<any> {
    return of(this.group.get('videos').value);
  }

  public reset(): void {
    this.group.reset({ videos: this.item || [] });
  }

  protected ngPostInit(): void {
    this.fields[0].value = Array.isArray(this.item) ? this.item : [];
  }

}
