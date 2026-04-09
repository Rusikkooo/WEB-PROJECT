import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    confirmPassword: ''
  };
  successMessage : string = '';
  constructor(private router: Router) {}
  onRegister() {
    console.log('Данные регистрации:', this.regData);
    this.successMessage = 'Вы успешно зарегистрировались! Сейчас вы будете перенаправлены на страницу входа.';
    // Здесь в будущем будет вызов метода из Angular Service 
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }
}
