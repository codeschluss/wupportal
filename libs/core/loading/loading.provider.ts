import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingProvider {

  private loads: BehaviorSubject<number> = new BehaviorSubject(0);

  private requests: HttpRequest<any>[] = [];

  public enqueue(request: HttpRequest<any>): void {
    this.requests.push(request);
    this.loads.next(this.requests.length);
  }

  public finished(request: HttpRequest<any>): void {
    if (this.requests.includes(request)) {
      this.requests = this.requests.filter((r) => r !== request);
      this.loads.next(this.requests.length);
    }
  }

  public subscribe(next: (value: number) => void): Subscription {
    return this.loads.subscribe((value) => next(value));
  }

}
