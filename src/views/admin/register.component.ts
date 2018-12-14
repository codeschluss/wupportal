import { Component } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionProvider } from '@portal/core';
import { UserModel } from 'src/realm/user/user.model';
import { UserProvider } from 'src/realm/user/user.provider';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    static readonly imports = [
        MatSelectModule
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
        private userProvider: UserProvider
        ) {
            this.organisations = this.route.snapshot.data.organisations;
        }

    register(): void {
        const user = new UserModel;
        user.id = '123';
        user.username = this.userName;
        user.fullname = this.fullName;
        user.password = this.password;
        user.phone = this.phone;
        user.organisations = this.organisationsCtrl.value;
        this.userProvider.create(user).then(() => {
            this.goToLogin();
        }).catch(
            error => {
                this.error = error;
                console.log(error);
            }
        );
    }

    goToLogin(): void {
        this.router.navigate(['/admin/login']);
    }

    goToHome(): void {
        this.router.navigate(['/home']);
    }
}
