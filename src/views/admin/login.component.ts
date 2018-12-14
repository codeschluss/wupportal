import { Component } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionProvider } from '@portal/core';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent {

    static readonly imports = [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule];

    userName: string = '';
    password: string = '';
    error: string;

    constructor(
        private router: Router,
        private session: SessionProvider) {}

    login(): void {
        this.session.login(this.userName, this.password).then(
            value => this.goToHome()).catch(error => {
                if (error.error && error.error.message) {
                    this.error = error.error.message.toLowerCase();
                } else {
                    this.error = error.statusText.toLowerCase();
                }
            }
        );
    }

    goToHome(): void {
        this.router.navigate(['/home']);
    }

    goToRegister(): void {
        this.router.navigate(['/admin/register']);
    }
}
