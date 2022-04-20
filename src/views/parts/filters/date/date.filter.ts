import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'date-filter-component',
  styleUrls: ['date.filter.sass'],
  templateUrl: 'date.filter.html'
})

export class DateFilterComponent
  implements OnInit {

  public dateRange: FormGroup;

  public get custom(): Record<string, string> {
    let { startDate, endDate } = this.dateRange.value;
    startDate &&= new Date(startDate - this.offset);
    endDate &&= new Date(endDate - this.offset);

    return {
      startDate: startDate?.toISOString().substring(0, 10) || null,
      endDate: endDate?.toISOString().substring(0, 10) || null
    }
  }

  public get today(): Record<string, string> {
    const date = new Date(Date.now() - this.offset);

    return {
      startDate: date.toISOString().substring(0, 10),
      endDate: date.toISOString().substring(0, 10)
    }
  }

  public get tomorrow(): Record<string, string> {
    const date = new Date(Date.now() + 86400000 - this.offset);

    return {
      startDate: date.toISOString().substring(0, 10),
      endDate: date.toISOString().substring(0, 10)
    }
  }

  public get weekend(): Record<string, string> {
    let startDate = new Date(Date.now() - this.offset);
    let endDate = new Date(Date.now() - this.offset);
    const date = startDate.getDate();
    const day = startDate.getDay();

    if (!day) {
      startDate = new Date(startDate.setDate(date - 2));
    } else {
      startDate = new Date(startDate.setDate(date + (5 - day)));
      endDate = new Date(new Date().setDate(startDate.getDate() + 2));
    }

    return {
      startDate: startDate.toISOString().substring(0, 10),
      endDate: endDate.toISOString().substring(0, 10)
    }
  }

  private get offset(): number {
    return new Date().getTimezoneOffset() * 60 * 1000;
  }

  public constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.dateRange = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });

    this.dateRange.valueChanges.pipe(
      filter(({ startDate, endDate }) => startDate && endDate)
    ).subscribe(({ startDate, endDate }) => {
      startDate &&= new Date(startDate - this.offset);
      endDate &&= new Date(endDate - this.offset);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          startDate: startDate?.toISOString().substring(0, 10),
          endDate: endDate.toISOString().substring(0, 10)
        }
      })
    });
  }

  public active(dates: Record<string, string>): boolean {
    const { startDate, endDate } = this.route.snapshot.queryParams;
    return startDate === dates.startDate && endDate === dates.endDate;
  }

}
