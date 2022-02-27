import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StringPrimitive as String } from '../../../../api/models/string-primitive';
import { BaseService, Box, CrudModel, CrudProvider, SessionProvider } from '../../../../core';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'like-piece',
  styleUrls: ['../base.piece.sass', 'like.piece.sass'],
  templateUrl: 'like.piece.html'
})

export class LikePieceComponent
  extends BasePiece {

  public get liked(): boolean {
    return this.sessionProvider.getLiked(this.item.id);
  }

  public constructor(
    private sessionProvider: SessionProvider
  ) {
    super();
  }

  public like(): void {
    const provider = (this.item.constructor as any)
      .provider as CrudProvider<BaseService, CrudModel>
        & { like: (id: string, subId?: String) => Observable<any> };

    if (provider.like) {
      const subId = this.sessionProvider.getSubscriptionId()
        ? Box(this.sessionProvider.getSubscriptionId())
        : undefined;

      provider.like(this.item.id, subId).subscribe(() => {
        this.sessionProvider.setLiked(this.item.id);
        (this.item as any).likes++;
      });
    }
  }

}
