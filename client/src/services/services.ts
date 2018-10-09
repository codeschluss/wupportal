import { Injectable } from '@angular/core';
import { ProviderModel } from 'src/models/provider.model';

@Injectable()
export class UserService {

  public claimUser(): boolean {
    return false;
  }

  public claimProvider(organisationId: string) {
    return false;
  }

  public claimAdmin(organisationId: string) {
    return false;
  }

  public claimSuperAdmin(): boolean {
    return false;
  }

  public getLanguage(): string {
    return 'en';
  }

  public getProviders(userId: string = null): ProviderModel[] {
    return [];
  }

}
