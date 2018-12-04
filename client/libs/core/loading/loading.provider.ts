import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingProvider {

  private loads: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private requests: HttpRequest<any>[] = [];

  public enqueue(request: HttpRequest<any>): void {
    this.requests.push(request);
    this.loads.next(true);
  }

  public finished(request: HttpRequest<any>): void {
    if (this.requests.includes(request)) {
      this.requests = this.requests.filter((req) => request !== req);
      this.loads.next(!!this.requests.length);
    }
  }

  public subscribe(next: (value: boolean) => void): Subscription {
    return this.loads.subscribe((value) => next(value));
  }

}
