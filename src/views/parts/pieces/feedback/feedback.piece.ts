import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'feedback',
  styleUrls: ['feedback.piece.sass'],
  templateUrl: 'feedback.piece.html'
})

export class FeedbackPieceComponent extends BasePiece {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
      super();
    }
}
