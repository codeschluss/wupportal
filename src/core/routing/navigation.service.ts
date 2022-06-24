import { Location } from '@angular/common';
import { HostListener, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = ['/'];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    });
  }

  public back(): void {
    this.history.pop();
    const next = this.history.pop();
    
    next 
      ? this.router.navigate([next])
      :this.router.navigate(['']);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }


}