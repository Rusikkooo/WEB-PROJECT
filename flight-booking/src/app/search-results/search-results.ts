import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {
  searchParams: any = {};
  filteredFlights: any[] = []; // Массив для отображения в таблице
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      console.log('Query Params:', this.searchParams);
      this.searchParams.isRoundTrip = this.searchParams.isRoundTrip === 'true';
      this.filterFlights();
    });
  }
  allFlights = [
    { id: 1, from: 'Almaty', to: 'Aktobe', price: 25000, airline: 'Air Astana', departure: '2026-04-14 10:00', arrival: '2026-04-14 11:30' },
    // ... другие рейсы
  ];
  filterFlights() {
    // Здесь будет логика фильтрации рейсов на основе searchParams
    this.filteredFlights = this.allFlights.filter(f => {
      const matchFrom = this.searchParams.from ? f.from.includes(this.searchParams.from) : true;
      const matchTo = this.searchParams.to ? f.to.includes(this.searchParams.to) : true;
      return matchFrom && matchTo;
    });
  }
}
