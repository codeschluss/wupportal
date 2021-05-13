import { Injectable } from '@angular/core';
import { LocalStorage, VALIDATION_ERROR } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { PlatformProvider } from '../platform/platform.provider';
import { SessionModel } from './session.model';

@Injectable({
  providedIn: 'root'
})

export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean)) as Observable<SessionModel>;
  }

  public constructor(
    private platformProvider: PlatformProvider,
    localStorage: LocalStorage
  ) {
    this.session = new BehaviorSubject<SessionModel>(null);

    localStorage.getItem<SessionModel>('clientSession', {
      schema: SessionModel.schema
    }).pipe(catchError((error) => {
      if (error.message === VALIDATION_ERROR) {
        return localStorage.getItem('clientSession').pipe(map((session) => {
          return Object.assign(
            new SessionModel(this.platformProvider.language),
            session
          );
        }))
      }

      return throwError(error);
    }), map((session) => {
      session ||= new SessionModel(this.platformProvider.language);
      session.subscriptionId = this.platformProvider.name !== 'server'
        ? session.subscriptionId
        : 'blocked';

      return session;
    })).subscribe((session) => {
      this.setLanguageCookie(session.language);
      this.session.next(session);

      this.value.subscribe((value) => {
        Object.setPrototypeOf(value, Object.prototype);
        localStorage.setItem('clientSession', value).subscribe();
      });
    });
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
    this.setLanguageCookie(this.session.value.language);
  }

  public getSubscriptionId(): string {
    return this.session.value.subscriptionId;
  }

  public setSubscriptionId(subscriptionId: string): void {
    this.session.next(Object.assign(this.session.value, { subscriptionId }));
  }

  private setLanguageCookie(language: string): void {
    if (this.platformProvider.name === 'browser') {
      this.platformProvider.document.cookie = `lang=${language};path=/`;
    }
  }

}
