import { Component } from '@angular/core';
import { BaseService, CrudModel, CrudProvider, SessionProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'like-piece',
  styleUrls: ['../base.piece.scss', 'like.piece.scss'],
  templateUrl: 'like.piece.html'
})

export class LikePieceComponent extends BasePiece {

  public get liked(): boolean {
    return this.sessionProvider.isLiked(this.item.id);
  }

  public constructor(
    private sessionProvider: SessionProvider
  ) {
    super();
  }

  public like(): void {
    const provider = (this.item.constructor as any)
      .provider as CrudProvider<BaseService, CrudModel>
        & { like: (id: string) => Observable<any> };

    if (provider.like) {
      provider.like(this.item.id).subscribe(() => {
        this.sessionProvider.like(this.item.id);
        (this.item as any).likes++;
      });
    }
  }

}
