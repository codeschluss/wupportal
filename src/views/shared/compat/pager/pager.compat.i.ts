import { EventEmitter } from '@angular/core';

export interface PagerCompat {

  goto: EventEmitter<number>;

  next: boolean;

  prev: boolean;

}
