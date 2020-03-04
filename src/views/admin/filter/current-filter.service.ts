import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentFilterService {

  private currentOnlySubject: BehaviorSubject<boolean>;
  public filterChange: Observable<boolean>;

  constructor() {
    this.currentOnlySubject = new BehaviorSubject<boolean>(false);
    this.filterChange = this.currentOnlySubject.asObservable()
  }

  changeCurrent(value: boolean) {
    this.currentOnlySubject.next(value);
  }

}
