import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'details-piece',
  styleUrls: ['../base.piece.sass', 'details.piece.sass'],
  templateUrl: 'details.piece.html'
})

export class DetailsPieceComponent
  extends BasePiece {

  public get icon(): IconProp {
    switch (this.namespace) {
      case 'event': return 'map-marker-alt';
      case 'story': return 'comment-dots';
      case 'place': return 'at';
    }
  }

  public constructor(
    public router: Router
  ) {
    super();
  }

}
