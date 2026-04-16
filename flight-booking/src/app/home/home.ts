import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import{ ActivatedRoute } from '@angular/router';
import{RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,RouterLink],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  constructor(private router: Router) {}
  isRoundTrip: boolean = false; // false - только туда, true - туда и обратно
  passengerCount: number = 1;
  dateError: string = '';


  cities: string[] = ['Almaty', 'Aktobe', 'Astana', 'Shymkent', 'Atyrau','Kokshetau','Kostanay','Karaganda','Pavlodar','Petropavlovsk','Taraz','Uralsk','Ust-Kamenogorsk','Zhezkazgan','Zhanaozen','Semey','Kyzylorda','Taldykorgan','Ekibastuz'];

  searchQuery = {
    from:'',
    to:'',
    date: '',
    returnDate: '',
    passengers: 1
  };
  
  ngOnInit() {
    // Присваиваем количество пассажиров здесь
    this.searchQuery.passengers = this.passengerCount;
  }
  // Метод для смены табов
  setTab(value: boolean) {
    this.isRoundTrip = value;
    this.dateError = '';
    if (!value) this.searchQuery.returnDate = '';
  }
  // ФУНКЦИЯ ВАЛИДАЦИИ (Шаг А)
  checkAvailability() {
    if (!this.searchQuery.from || !this.searchQuery.to || !this.searchQuery.date) return;

    const flight = this.availableFlights.find(
      f => f.from === this.searchQuery.from && f.to === this.searchQuery.to
    );

    if (flight) {
      if (!flight.dates.includes(this.searchQuery.date)) {
        this.dateError = `На выбранную дату рейсов нет. Доступные дни: ${flight.dates.join(', ')}`;
      } else {
        this.dateError = ''; // Рейс найден
      }
    } else {
      this.dateError = 'К сожалению, по данному направлению рейсов нет';
    }
  }

  availableFlights = [ // это для календаря
    { from: 'Almaty', to: 'Aktobe', dates: ['16.04.2026', '18.04.2026', '20.04.2026'] },
    { from: 'Astana', to: 'Almaty', dates: ['15.04.2026', '17.04.2026'] },
    { from: 'Almaty', to: 'Astana', dates: ['16.04.2026', '19.04.2026'] }
  ];
  flights = [
    { id: 1, from: 'ALA', to: 'AKX', price: 25000, time: '14:30', airline: 'Air Astana' },
    { id: 2, from: 'ALA', to: 'NQZ', price: 15000, time: '09:00', airline: 'FlyArystan' },
    { id: 3, from: 'AKX', to: 'ALA', price: 30000, time: '18:45', airline: 'SCAT Airlines' },
  ];
  isLoading: boolean = false;
  
  onSearch() {
  // Проверка на заполнение обязательных полей
  if (!this.searchQuery.from || !this.searchQuery.to || !this.searchQuery.date) {
    this.dateError = 'Пожалуйста, заполните все поля поиска';
    return;
  }
  // Если всё ок — выполняем навигацию
  this.router.navigate(['/search-results'], {
    queryParams: {
      from: this.searchQuery.from,
      to: this.searchQuery.to,
      date: this.searchQuery.date,
      passengers: this.passengerCount, 
      returnDate: this.isRoundTrip ? this.searchQuery.returnDate : null,
      isRoundTrip: this.isRoundTrip
    }
  });
}
  onLogout() {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }

}
