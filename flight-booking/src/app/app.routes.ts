import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { SearchResults } from './search-results/search-results';
import { PassengerDetails } from './passenger-details/passenger-details';
import { PayInvoice } from './pay-invoice/pay-invoice';	
import { Tickets } from './tickets/tickets';	

export const routes: Routes = [
	{ path: 'login', component: Login },
	{ path: 'register', component: Register },
    {path:'home',component:Home},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'search-results', component:SearchResults },
	{ path: 'passenger-details', component: PassengerDetails },
	{ path: 'pay-invoice', component: PayInvoice },
	{ path: 'tickets', component: Tickets }
];
