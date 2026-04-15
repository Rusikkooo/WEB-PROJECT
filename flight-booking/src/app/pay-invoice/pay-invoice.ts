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

        // 4. Через 2 секунды после галочки уходим на главную
        setTimeout(() => {
          // this.router.navigate(['/home']);
          alert('Оплата прошла успешно! Приятного полета.');
          this.router.navigate(['/home']);
        }, 2500);

      }, 3000);
    }
  }


}

