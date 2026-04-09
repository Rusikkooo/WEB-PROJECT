import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule,RouterLink],
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})
export class Login {
    userData = {
        username: '',
        password: ''
    };
    errorMessage :string = '';
loginData: any;
    constructor(private router: Router) {}
    onSubmit() {
      // Сбрасываем ошибку перед новой попыткой
      this.errorMessage = '';
  // 1. Проверяем, что поля не пустые (базовая валидация)
    if (this.userData.username === 'admin' && this.userData.password === '123456') {
    
      console.log('Авторизация успешна!');
    
    // 2. Имитируем сохранение токена (требование по JWT) 
      localStorage.setItem('access_token', 'fake-jwt-token');
    
    // 3. Только теперь перенаправляем 
      this.router.navigate(['/home']);
    
  } else {
    // 4. Обработка ошибки (требование по Graceful Error Handling) 
    this.errorMessage = 'Неверный логин или пароль';
  }
}
}
