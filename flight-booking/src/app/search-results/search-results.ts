import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {
  searchParams: any = {};
  filteredFlights: any[] = []; // Массив для отображения в таблице

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    // 1. Создаем копию объекта, чтобы его можно было изменять
    this.searchParams = { ...params }; 
    
    console.log('Query Params:', this.searchParams);

    // 2. Теперь спокойно меняем значение в нашей копии
    this.searchParams.isRoundTrip = this.searchParams.isRoundTrip === 'true';
    // 3. Запускаем фильтрацию
    this.filterFlights();

    
  });
}
  allFlights = [
    { id: 1, from: 'Almaty', to: 'Aktobe', price: 25000, airline: 'Air Astana', departure: '2026-04-14 10:00', arrival: '2026-04-14 11:30' },
    { id: 2, from: 'Ekibastuz', to: 'Kostanay', price: 18000, airline: 'FlyArystan', departure: '2026-04-15 08:00', arrival: '2026-04-15 09:30' },
    { id: 3, from: 'Almaty', to: 'Astana', price: 20000, airline: 'SCAT', departure: '2026-04-14 15:00', arrival: '2026-04-14 16:40' }
  ];
  filterFlights() {
    // Здесь будет логика фильтрации рейсов на основе searchParams
    this.filteredFlights = this.allFlights.filter(f => {
      const matchFrom = this.searchParams.from ? f.from.includes(this.searchParams.from) : true;
      const matchTo = this.searchParams.to ? f.to.includes(this.searchParams.to) : true;
      return matchFrom && matchTo;
    });

  }
  // Метод для перехода на страницу деталей рейса
  goToBooking(flight: any) {
  // Переходим на страницу деталей, передавая ID рейса и количество пассажиров
  this.router.navigate(['/passenger-details'], {
    queryParams: {
      flightId: flight.id,
      passengers: this.searchParams.passengers || 1,
      price: flight.price
    }
  });
}
}
