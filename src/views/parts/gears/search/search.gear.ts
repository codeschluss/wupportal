import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-gear',
  styleUrls: ['search.gear.sass'],
  templateUrl: 'search.gear.html'
})

export class SearchGearComponent {

  public formControl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  public constructor(
    private router: Router
  ) { }

  public search(): void {
    if (this.formControl.valid) {
      this.router.navigate(['/', 'search', this.formControl.value]);
    }
  }

}
