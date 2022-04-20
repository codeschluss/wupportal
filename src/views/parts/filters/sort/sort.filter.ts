import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sort-filter-component',
  styleUrls: ['sort.filter.sass'],
  templateUrl: 'sort.filter.html'
})

export class SortFilterComponent {

  public get sort(): string {
    return this.route.snapshot.queryParams.sort;
  }

  public constructor(
    private route: ActivatedRoute
  ) { }

}
