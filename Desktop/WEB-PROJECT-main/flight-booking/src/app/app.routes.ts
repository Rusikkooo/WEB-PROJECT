import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { SearchResults } from './search-results/search-results';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
	{ path: 'login', component: Login },
	{ path: 'register', component: Register },
    {path:'home',component:Home, canActivate: [AuthGuard]},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'search-results', component:SearchResults }
];
