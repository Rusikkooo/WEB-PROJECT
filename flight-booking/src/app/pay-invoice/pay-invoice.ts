import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pay-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pay-invoice.html',
  styleUrl: './pay-invoice.css',
})
export class PayInvoice implements OnInit {
  totalAmount: number = 0;
  isProcessing: boolean = false; // Статус обработки
  isSuccess: boolean = false;    // Статус успеха
  queryParamsData: any = {};
  paymentData = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Получаем итоговую сумму, которую мы передали из PassengerDetails
      this.totalAmount = +params['total'] || 0;
      this.queryParamsData = params; // Сохраняем все данные для дальнейшего использования
      console.log('Полученные query params в PayInvoice:', this.queryParamsData);
    });
  }
  onPay(form: NgForm) {
    if (form.valid && !this.isProcessing) {
      this.isProcessing = true;
      // alert('Оплата прошла успешно! Приятного полета.');
      // this.router.navigate(['/home']); 

      setTimeout(() => {
        this.isProcessing = false;
        this.isSuccess = true; // 3. Показываем галочку
        this.saveTicketToStorage();
        // 4. Через 2 секунды после галочки уходим на главную
        setTimeout(() => {
          // this.router.navigate(['/home']);
          alert('Оплата прошла успешно! Приятного полета.');
          this.router.navigate(['/home']);
        }, 2500);

      }, 3000);
    }
  }

  saveTicketToStorage() {
    // Достаем данные из URL, которые мы передали из PassengerDetails
    const params = this.queryParamsData;
    
    const newTicket = {
      id: Date.now(),
      from: params['from'] || 'Almaty',
      to: params['to'] || 'Aktobe',
      date: params['date'] || '2026-04-14',
      passenger: params['passenger'] || 'Ruslan Myrzabaev', // Имя из PassengerDetails
      airline: params['airline'] || 'AERO AIRWAYS',
      gate: 'A' + Math.floor(Math.random() * 15 + 10), // Рандомный гейт
      seat: Math.floor(Math.random() * 25 + 1) + 'F',  // Рандомное место
      price: this.totalAmount
    };
    // Сохраняем в массив в LocalStorage
    const tickets = JSON.parse(localStorage.getItem('user_tickets') || '[]');
    tickets.unshift(newTicket);
    localStorage.setItem('user_tickets', JSON.stringify(tickets));
    
    console.log('Билет успешно сохранен в память:', newTicket);
  }

}

