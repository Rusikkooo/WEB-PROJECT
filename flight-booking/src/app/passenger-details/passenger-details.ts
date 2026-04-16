import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-passenger-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-details.html',
  styleUrl: './passenger-details.css',
})
export class PassengerDetails implements OnInit {
  passengers: any[] = []; // Здесь будут данные всех пассажиров
  flightId: string = '';
  ticketPrice: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.flightId = params['flightId'];
      const count = +params['passengers'] || 1; // Превращаем строку в число
      this.ticketPrice = +params['price'] || 0; // Получаем цену билета
      
      // Создаем пустые объекты для каждого пассажира
      this.passengers = Array.from({ length: count }, () => ({
        firstName: '',
        middleName: '',
        lastName: '',
        contactNo: '',
        dob: ''
      }));
    });
  }

  onProceed() {
    console.log('Данные всех пассажиров:', this.passengers);
    // Здесь будет переход к билету
    const totalToPay = this.passengers.length * this.ticketPrice;
    const mainPassenger = `${this.passengers[0].firstName} ${this.passengers[0].lastName}`;
    const currentParams = this.route.snapshot.queryParams;
    this.router.navigate(['/pay-invoice'], {
      queryParams: {
        total: totalToPay,
      // Добавляем данные для билета, которые пришли из Home
        from: currentParams['from'],
        to: currentParams['to'],
        date: currentParams['date'],
        passenger: mainPassenger, // Передаем имя для печати на билете
        airline: currentParams['airline'] || 'AERO AIRWAYS'
    }
    });
  }
}
