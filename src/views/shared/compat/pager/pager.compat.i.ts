import { EventEmitter } from '@angular/core';

export interface PagerCompat {

  readonly compat: string;

  goto: EventEmitter<number>;

  next: boolean;

  prev: boolean;

}
