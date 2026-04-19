import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  imports:[RouterLink,FormsModule,CommonModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  regData = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };
  successMessage : string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    if (this.regData.password !== this.regData.password2) {
      this.errorMessage = 'Passwords do not match';
      this.isLoading = false;
      return;
    }

    this.authService.register(this.regData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error?.detail || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
