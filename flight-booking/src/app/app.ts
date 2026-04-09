import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Login],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('flight-booking');
}
