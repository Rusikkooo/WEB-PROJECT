import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isRoundTrip: boolean = true;
  searchQuery = {
    from:'',
    to:'',
    date: '',
    passengers: 1
  };

  flights = [
    { id: 1, from: 'ALA', to: 'AKX', price: 25000, time: '14:30', airline: 'Air Astana' },
    { id: 2, from: 'ALA', to: 'NQZ', price: 15000, time: '09:00', airline: 'FlyArystan' },
    { id: 3, from: 'AKX', to: 'ALA', price: 30000, time: '18:45', airline: 'SCAT Airlines' },
  ];

  onSearch() {
    console.log('Ищем рейсы:', this.searchQuery);
    // Здесь будет вызов API
  }
  onLogout() {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }

}
