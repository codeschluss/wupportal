import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CrudJoiner, CrudResolver, MetatagService, OrganisationModel, TokenProvider, UserModel, UserProvider } from '../../../../core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'register.page.sass'],
  templateUrl: 'register.page.html'
})

export class RegisterPageComponent
  extends BasePage
  implements AfterViewInit {

  public boxes: any = {
    createOrganisation: false,
    joinBloggers: false
  };

  public email: FormControl = new FormControl(null, [
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    Validators.required
  ]);

  public fullname: FormControl = new FormControl(null, [
    Validators.required
  ]);

  public joinOrganisations: FormControl = new FormControl(null, [
    Validators.nullValidator
  ]);

  public password: FormControl = new FormControl(null, [
    Validators.minLength(8),
    Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
    Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
    Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
    Validators.required
  ]);

  public passwordConfirm: FormControl = new FormControl(null, [
    Validators.minLength(8),
    Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
    Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
    Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/),
    Validators.required
  ]);

  public phone: FormControl = new FormControl(null, [
    Validators.required
  ]);

  protected path: string = 'register';

  public get name(): Observable<string> {
    return this.metatagService.name;
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations;
  }

  public get valid(): boolean {
    return true
      && this.email.valid
      && this.fullname.valid
      && this.password.valid
      && this.passwordConfirm.valid
      && this.phone.valid;
  }

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        organisations: CrudResolver
      },
      data: {
        resolve: {
          organisations: CrudJoiner.of(OrganisationModel, {
            approved: true
          })
        }
      }
    };
  }

  public constructor(
    private metatagService: MetatagService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.passwordConfirm.disable();

    merge(
      this.password.valueChanges,
      this.passwordConfirm.valueChanges
    ).subscribe(() => this.validate());
  }

  public register(): void {
    const user = new UserModel();
    user.applyBlogger = this.boxes.joinBloggers;
    user.name = this.fullname.value;
    user.organisationRegistrations = this.joinOrganisations.value;
    user.password = this.password.value;
    user.phone = this.phone.value;
    user.username = this.email.value;

    this.userProvider.create(user).pipe(
      mergeMap(() => this.tokenProvider.login(user.username, user.password)),
      map((tokens) => tokens.access.id)
    ).subscribe((userId) => this.router.navigate(
      this.boxes.createOrganisation
        ? ['/', 'admin', 'edit', 'organisations', 'new']
        : ['/', 'admin', 'account', userId]
    ));
  }

  private validate(): void {
    const ctrl1 = this.password;
    const ctrl2 = this.passwordConfirm;

    if (ctrl1.value && ctrl2.disabled) {
      ctrl2.enable({ emitEvent: false });
    }

    if (!ctrl1.value && ctrl2.enabled) {
      ctrl2.patchValue(null, { emitEvent: false });
      ctrl2.disable({ emitEvent: false });
    }

    if (ctrl1.value && ctrl2.enabled && ctrl1.value !== ctrl2.value) {
      ctrl1.setErrors({ mismatch: true });
      ctrl2.setErrors({ mismatch: true });
    } else {
      ctrl1.updateValueAndValidity({ emitEvent: false });
      ctrl2.updateValueAndValidity({ emitEvent: false });
    }
  }

}
