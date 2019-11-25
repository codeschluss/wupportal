import { Injectable } from '@angular/core';
import { LocalStorage, VALIDATION_ERROR } from '@ngx-pwa/local-storage';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { PlatformProvider } from '../platform/platform.provider';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean)) as Observable<SessionModel>;
  }

  public constructor(
    localStorage: LocalStorage,
    platformProvider: PlatformProvider
  ) {
    this.session = new BehaviorSubject<SessionModel>(null);

    localStorage.getItem<SessionModel>('clientSession', {
      schema: SessionModel.schema
    }).pipe(
      catchError((e) => e.message === VALIDATION_ERROR ? EMPTY : throwError(e)),
      map((session) => session || new SessionModel(platformProvider.language)),
      tap((session) => this.session.next(session))
    ).subscribe(() => this.value.subscribe((value) => {
      Object.setPrototypeOf(value, Object.prototype);
      localStorage.setItem('clientSession', value).subscribe();
    }));
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

  public getLanguage(): string {
    return this.session.value.language;
  }

  public setLanguage(language: string): void {
    this.session.next(Object.assign(this.session.value, { language }));
  }

}
