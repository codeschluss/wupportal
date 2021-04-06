import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingProvider {

  private loading: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private requests: HttpRequest<any>[] = [];

  public get value(): Observable<number> {
    return this.loading.asObservable();
  }

  public enqueue(request: HttpRequest<any>): void {
    this.requests.push(request);
    this.loading.next(this.requests.length);
  }

  public finished(request: HttpRequest<any>): void {
    this.requests.splice(this.requests.indexOf(request), 1);
    this.loading.next(this.requests.length);
  }

}
