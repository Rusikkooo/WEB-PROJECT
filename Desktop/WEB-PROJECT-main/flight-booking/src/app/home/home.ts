import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isRoundTrip: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  cities: string[] = ['Almaty', 'Aktobe', 'Astana', 'Shymkent', 'Atyrau','Kokshetau','Kostanay','Karaganda','Pavlodar','Petropavlovsk','Taraz','Uralsk','Ust-Kamenogorsk','Zhezkazgan','Zhanaozen','Semey','Kyzylorda','Taldykorgan','Ekibastuz'];

  searchQuery = {
    from:'',
    to:'',
    date: '',
    returnDate: '',
    passengers: 1
  };
  

  // Метод для смены табов
  setTab(value: boolean) {
    this.isRoundTrip = value;
  }
  flights = [
    { id: 1, from: 'ALA', to: 'AKX', price: 25000, time: '14:30', airline: 'Air Astana' },
    { id: 2, from: 'ALA', to: 'NQZ', price: 15000, time: '09:00', airline: 'FlyArystan' },
    { id: 3, from: 'AKX', to: 'ALA', price: 30000, time: '18:45', airline: 'SCAT Airlines' },
  ];
  isLoading: boolean = false;
  
  onSearch() {
    console.log('Ищем рейсы:', this.searchQuery);
    this.router.navigate(['/search-results'], { 
      queryParams: {
        from: this.searchQuery.from,
        to: this.searchQuery.to,
        date: this.searchQuery.date,
        // returnDate: this.searchQuery.returnDate,
        // passengers: this.searchQuery.passengers,
        isRoundTrip: this.isRoundTrip
        
      }
    });
    // this.isLoading = true;
    // this.ro
    // Здесь будет вызов API
  }
  onLogout() {
    this.authService.logout();
  }

}
