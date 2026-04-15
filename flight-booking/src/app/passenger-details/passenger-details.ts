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
    this.router.navigate(['/pay-invoice'], {
      queryParams: {
        total: totalToPay
      }
    });
  }
}
