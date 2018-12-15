import { Component } from '@angular/core';
import { MatSelectModule, MatBottomSheet, MatBottomSheetModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionProvider } from '@portal/core';
import { UserModel } from 'src/realm/user/user.model';
import { UserProvider } from 'src/realm/user/user.provider';
import { InfoBottomComponent } from './info.bottomsheet.component';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    static readonly imports = [
        MatSelectModule,
        MatBottomSheetModule
    ];

    userName: string = '';
    password: string = '';
    passwordRepeat: string;
    fullName: string;
    phone: string;

    error: string;
    organisationsCtrl = new FormControl();
    organisations: any[];

    constructor(
        private router: Router,
        private session: SessionProvider,
        private route: ActivatedRoute,
        private userProvider: UserProvider,
        private bottomSheet: MatBottomSheet
        ) {
            this.organisations = this.route.snapshot.data.organisations;
        }

    register(): void {
        const user = new UserModel;
        user.name = this.fullName;
        user.password = this.password;
        user.phone = this.phone;
        user.username = this.userName;
        user.organisations = this.organisationsCtrl.value;
        this.userProvider.create(user).subscribe(() => {
            this.openBottomSheet();
            this.goToLogin();
        },
        error => {
            this.error = error;
            console.log(error);
        });
    }

    goToLogin(): void {
        this.router.navigate(['/admin/login']);
    }

    goToHome(): void {
        this.router.navigate(['/home']);
    }

    openBottomSheet(): void {
        this.bottomSheet.open(InfoBottomComponent,
            { data: { message: 'successfullRegister' } });
      }
}
