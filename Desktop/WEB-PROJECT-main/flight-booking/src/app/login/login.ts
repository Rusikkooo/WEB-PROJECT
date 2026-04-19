import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule,RouterLink, CommonModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})
export class Login {
    userData = {
        username: '',
        password: ''
    };
    errorMessage :string = '';
    isLoading = false;

    constructor(private router: Router, private authService: AuthService) {}

    onSubmit() {
        this.errorMessage = '';
        this.isLoading = true;

        this.authService.login(this.userData).subscribe({
            next: (response) => {
                console.log('Login successful:', response);
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                this.router.navigate(['/home']);
            },
            error: (error) => {
                console.error('Login failed:', error);
                this.errorMessage = 'Invalid username or password';
                this.isLoading = false;
            }
        });
    }
}
