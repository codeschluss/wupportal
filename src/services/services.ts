import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

  public isAccount(): boolean {
    return true;
  }

  public isSuperUser(): boolean {
    return true;
  }

  public getLanguage(): string {
    return 'en';
  }

}
