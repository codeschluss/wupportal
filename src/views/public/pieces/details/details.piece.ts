import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'details-piece',
  styleUrls: ['../base.piece.scss', 'details.piece.scss'],
  templateUrl: 'details.piece.html'
})

export class DetailsPieceComponent extends BasePiece {

  public get icon(): string {
    switch (this.namespace) {
      case 'activities': return 'map-marker-alt';
      case 'blogposts': return 'comment-dots';
      case 'organisations': return 'at';
      case 'infopages': return 'info-circle';
    }
  }

  public constructor(
    public router: Router
  ) {
    super();
  }

}
