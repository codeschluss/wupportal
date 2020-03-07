import { Injectable } from '@angular/core';
import { LocalStorage, VALIDATION_ERROR } from '@ngx-pwa/local-storage';
import { DeviceProvider } from '@wooportal/app';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean)) as Observable<SessionModel>;
  }

  public constructor(
    deviceProvider: DeviceProvider,
    localStorage: LocalStorage
  ) {
    this.session = new BehaviorSubject<SessionModel>(null);

    localStorage.getItem<SessionModel>('clientSession', {
      schema: SessionModel.schema
    }).pipe(
      catchError((error) => error.message === VALIDATION_ERROR
        ? localStorage.getItem('clientSession').pipe(map((session) =>
            Object.assign(new SessionModel(deviceProvider.language), session)))
        : throwError(error)
      ),
      map((session) => session || new SessionModel(deviceProvider.language)),
      tap((session) => this.session.next(session))
    ).subscribe(() => this.value.subscribe((value) => {
      Object.setPrototypeOf(value, Object.prototype);
      localStorage.setItem('clientSession', value).subscribe();
    }));
  }

  public getFollowed(id: string): boolean {
    return this.session.value.followed.includes(id);
  }

  public setFollowed(id: string): void {
    if (!this.getFollowed(id)) {
      this.session.next(Object.assign(this.session.value, {
        followed: this.session.value.followed.concat(id)
      }));
    }
  }

  public delFollowed(id: string): void {
    if (this.getFollowed(id)) {
      this.session.next(Object.assign(this.session.value, {
        followed: this.session.value.followed.filter((i) => i !== id)
      }));
    }
  }

  public getLiked(id: string): boolean {
    return this.session.value.likes.includes(id);
  }

  public setLiked(id: string): void {
    if (!this.getLiked(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.concat(id)
      }));
    }
  }

  public delLiked(id: string): void {
    if (this.getLiked(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.filter((i) => i !== id)
      }));
    }
  }

  public getLanguage(): string {
    return this.session.value.language;
  }

  public setLanguage(language: string): void {
    this.session.next(Object.assign(this.session.value, { language }));
  }

  public getSubscriptionId(): string {
    return this.session.value.subscriptionId;
  }

  public setSubscriptionId(subscriptionId: string): void {
    this.session.next(Object.assign(this.session.value, { subscriptionId }));
  }

}
