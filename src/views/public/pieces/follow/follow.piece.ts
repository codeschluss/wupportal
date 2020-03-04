import { Component } from '@angular/core';
import { Box, SessionProvider } from '@wooportal/core';
import { ActivityModel } from '../../../../base/models/activity.model';
import { BloggerModel } from '../../../../base/models/blogger.model';
import { OrganisationModel } from '../../../../base/models/organisation.model';
import { TopicModel } from '../../../../base/models/topic.model';
import { SubscriptionProvider } from '../../../../base/providers/subscription.provider';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'follow-piece',
  styleUrls: ['../base.piece.scss', 'follow.piece.scss'],
  templateUrl: 'follow.piece.html'
})

export class FollowPieceComponent extends BasePiece {

  public get disabled(): boolean {
    return !this.sessionProvider.getSubscriptionId();
  }

  public get followed(): boolean {
    return this.sessionProvider.getFollowed(this.item.id);
  }

  public constructor(
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider
  ) {
    super();
  }

  public follow(): void {
    let method; switch (true) {
      case this.item instanceof ActivityModel:
        method = this.subscriptionProvider.linkActivity;
        break;

      case this.item instanceof BloggerModel:
        method = this.subscriptionProvider.linkBlogger;
        break;

      case this.item instanceof OrganisationModel:
        method = this.subscriptionProvider.linkOrganisation;
        break;

      case this.item instanceof TopicModel:
        method = this.subscriptionProvider.linkTopic;
        break;
    }

    method(this.sessionProvider.getSubscriptionId(), Box(this.item.id))
      .subscribe(() => this.sessionProvider.setFollowed(this.item.id));
  }

}
