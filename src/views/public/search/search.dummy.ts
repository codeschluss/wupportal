import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Selfrouter } from '@wooportal/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `<label [text]="query | async">{{ query | async }}</label>`
})

export class SearchDummyComponent extends Selfrouter implements OnInit {

  public query: Observable<any>;

  protected routing: Route = {
    path: 'search/:query'
  };

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.query = this.route.paramMap.pipe(map((params) => params.get('query')));
  }

}
