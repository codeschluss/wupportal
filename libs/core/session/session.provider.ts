import { Injectable } from '@angular/core';
import { JSONSchemaObject, LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean));
  }

  public constructor(
    localStorage: LocalStorage
  ) {
    this.session = new BehaviorSubject(null);

    localStorage.getItem<SessionModel>('clientSession', {
      schema: SessionModel.schema as JSONSchemaObject
    }).pipe(
      map((session) => session || new SessionModel()),
      tap((session) => this.session.next(session))
    ).subscribe(() => this.value.subscribe(
      (session) => localStorage.setItemSubscribe('clientSession', session)));
  }

  public like(id: string): void {
    if (!this.session.value.likes.includes(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.concat(id)
      }));
    }
  }

}
