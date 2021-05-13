import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pager-component',
  styleUrls: ['pager.component.sass'],
  templateUrl: 'pager.component.html'
})

export class PagerComponent {

  @Input()
  public page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }

  public get next(): boolean {
    return this.page && this.page.number < this.page.totalPages - 1;
  }

  public get prev(): boolean {
    return this.page && this.page.number > 0;
  }

  public get nextLink(): object {
    return {
      page: (parseInt(this.route.snapshot.queryParams.page, 10) || 0) + 1
    };
  }

  public get prevLink(): object {
    return {
      page: parseInt(this.route.snapshot.queryParams.page, 10) - 1 || null
    };
  }

  public constructor(
    private route: ActivatedRoute
  ) { }

}
