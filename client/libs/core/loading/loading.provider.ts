import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingProvider {

  private loading: BehaviorSubject<number> = new BehaviorSubject(0);

  private requests: HttpRequest<any>[] = [];

  public get value(): Observable<number> { return this.loading.asObservable(); }

  public enqueue(request: HttpRequest<any>): void {
    this.requests.push(request);
    this.loading.next(this.requests.length);
  }

  public finished(request: HttpRequest<any>): void {
    if (this.requests.includes(request)) {
      this.requests = this.requests.filter((r) => r !== request);
      this.loading.next(this.requests.length);
    }
  }

}
