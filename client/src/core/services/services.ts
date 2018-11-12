import { Injectable } from '@angular/core';
import { ProviderEntity } from '../entities/provider.entity';

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

  public getProviders(userId: string = null): ProviderEntity[] {
    return [];
  }

}
