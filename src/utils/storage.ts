import { Injectable } from '@angular/core';
import { LocalDatabase, SerializationError, StorageMap } from '@ngx-pwa/local-storage';
import { asyncScheduler, Observable, of, throwError } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import * as nativeStorage from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: StorageMap
})

export class NativeStorageDatabase implements LocalDatabase {

  public get size(): Observable<number> {
    return of(nativeStorage.getAllKeys().length);
  }

  public clear(): Observable<undefined> {
    nativeStorage.clear();
    return of(undefined);
  }

  public delete(key: string): Observable<undefined> {
    nativeStorage.remove(key);
    return of(undefined);
  }

  public get<T = any>(key: string): Observable<T | undefined> {
    const data = nativeStorage.getString(key);

    if (data === null || data === undefined) {
      return of(undefined);
    }

    try {
      return of(JSON.parse(data) as T);
    } catch (error) {
      return throwError(error as SyntaxError);
    }
  }

  public has(key: string): Observable<boolean> {
    return nativeStorage.hasKey(key) ? of(true) : of(false);
  }

  public keys(): Observable<string> {
    return new Observable<string>((observer) => {
      nativeStorage.getAllKeys().forEach((key) => observer.next(key));
      return () => observer.complete();
    }).pipe(observeOn(asyncScheduler));
  }

  public set(key: string, data: any): Observable<undefined> {
    let json: string | null = null;

    if (
      data !== null &&
      !Array.isArray(data) &&
      typeof data === 'object' &&
      !(
        Object.getPrototypeOf(data) === null ||
        Object.getPrototypeOf(data) === Object.prototype
      )
    ) {
      return throwError(new SerializationError());
    }

    try {
      json = JSON.stringify(data);
    } catch (error) {
      return throwError(error as TypeError);
    }

    try {
      nativeStorage.setString(key, json);
      return of(undefined);
    } catch (error) {
      return throwError(error as DOMException);
    }
  }

}
