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

  private created: Set<string> = new Set<string>();

  private labels: LabelModel[] = [];

  private token: AccessTokenModel;

  public constructor(
    private labelProvider: LabelProvider,
    tokenProvicer: TokenProvider
  ) {
    tokenProvicer.value.subscribe((tokens) => this.token = tokens.access);
  }

  public create(tagId: string, content: string = tagId): void {
    const label = new LabelModel({ content, tagId });

    this.labelProvider.create(label).pipe(
      catchError(() => of(label))
    ).subscribe((result) => {
      this.labels.push(result);
    });
  }

  public lookup(tagId: string): string {
    const label = this.labels.find((i) => i.tagId === tagId);

    if (label) {
      tagId = label.content;
    } else if (!this.created.has(tagId) && (
      this.token?.superuser || this.token?.translator
    )) {
      this.created.add(tagId);
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
