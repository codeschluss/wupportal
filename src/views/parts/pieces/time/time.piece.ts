import { Component } from '@angular/core';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'time-piece',
  styleUrls: ['../base.piece.sass', 'time.piece.sass'],
  templateUrl: 'time.piece.html'
})

export class TimePieceComponent
  extends BasePiece { }
