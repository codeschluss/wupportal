import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccessTokenModel } from '../auth/access-token.model';
import { TokenProvider } from '../auth/token.provider';
import { LabelModel } from '../models/label.model';
import { LabelProvider } from '../providers/label.provider';

@Injectable({
  providedIn: 'root'
})

export class LabelResolver
  implements Resolve<LabelModel[]> {

  private labels: LabelModel[] = [];

  private token: AccessTokenModel;

  public constructor(
    private labelProvider: LabelProvider,
    tokenProvicer: TokenProvider
  ) {
    tokenProvicer.value.subscribe((tokens) => this.token = tokens.access);
  }

  public create(tagId: string, content: string = tagId): void {
    this.labelProvider.create(Object.assign(new LabelModel(), {
      content,
      tagId
    })).pipe(catchError(() => of(Object.assign(new LabelModel(), {
      tagId, content
    })))).subscribe((result) => {
      this.labels.push(result);
    });
  }

  public lookup(tagId: string): string {
    const label = this.labels.find((i) => i.tagId === tagId);

    if (label) {
      tagId = label.content;
    } else if (this.token?.superuser || this.token?.translator) {
      this.create(tagId);
    }

    return tagId;
  }

  public resolve(): Observable<LabelModel[]> {
    return this.labelProvider.readAll({ }).pipe(
      catchError(() => of([])),
      tap((labels) => this.labels.push(...labels))
    );
  }

}
