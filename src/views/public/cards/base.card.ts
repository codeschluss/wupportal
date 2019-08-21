import { HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, CrudModel, CrudProvider, SessionProvider } from '@wooportal/core';
import { Observable } from 'rxjs';

export abstract class BaseCard<Model extends CrudModel> {

  @HostBinding('class')
  public readonly class: string = 'base-card';

  @Input()
  public item: Model;

  public get liked(): boolean {
    return this.sessionProvider.isLiked(this.item.id);
  }

  public constructor(
    public router: Router,
    private sessionProvider: SessionProvider
  ) { }

  public like(): void {
    const provider = this.item.constructor
      ['provider'] as CrudProvider<BaseService, Model>
        & { like: (id: string) => Observable<any> };

    if ('like' in provider) {
      provider.like(this.item.id).subscribe(() => {
        this.sessionProvider.like(this.item.id);
        (this.item as any).likes++;
      });
    }
  }

  public share(): void {
    console.log(`share: ${this.item.id}`);
  }

}
