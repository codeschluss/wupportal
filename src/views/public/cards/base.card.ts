import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { CrudModel, SessionProvider } from '@wooportal/core';

export abstract class BaseCard<Model extends CrudModel> {

  @Input()
  public item: Model;

  public constructor(
    public router: Router,
    private sessionProvider: SessionProvider
  ) { }

  public like(item: Model): void {
    this.sessionProvider.like(item.id);
  }

  public liked(item: Model): boolean {
    return this.sessionProvider.isLiked(item.id);
  }

  public share(item: Model): void {
    console.log(`share: ${item.id}`);
  }

}
