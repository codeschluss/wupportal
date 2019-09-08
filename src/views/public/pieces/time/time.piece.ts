import { Component } from '@angular/core';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'time-piece',
  styleUrls: ['../base.piece.scss', 'time.piece.scss'],
  templateUrl: 'time.piece.html'
})

export class TimePieceComponent extends BasePiece { }
