
import { OnInit ,Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {
  myTickets: any[] = [];

  ngOnInit() {
    // 1. Достаем строку из памяти
    const saved = localStorage.getItem('user_tickets');
    // 2. Превращаем строку обратно в массив объектов
    this.myTickets = saved ? JSON.parse(saved) : [];
    
    console.log('Загруженные билеты:', this.myTickets);
  }

  // Добавим метод для удаления билета (на всякий случай)
  deleteTicket(id: number) {
    this.myTickets = this.myTickets.filter(t => t.id !== id);
    localStorage.setItem('user_tickets', JSON.stringify(this.myTickets));
  }
}
