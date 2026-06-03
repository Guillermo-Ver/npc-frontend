import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  username: string | null = null;
  orders: any[] = [];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.username = user;
      if (this.username) {
        this.fetchOrderHistory();
      } else {
        this.loading = false;
      }
    });
  }

  fetchOrderHistory() {
    this.http.get<any[]>(`https://npc-backend-ul83.onrender.com/api/orders/user/${this.username}`).subscribe({
      next: (data) => {
        // Ordenamos las compras para que las más nuevas salgan arriba
        this.orders = data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('>> ERROR AL OBTENER HISTORIAL:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}