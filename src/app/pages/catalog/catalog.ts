import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {
  products: any[] = [];
  loading: boolean = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.http.get<any[]>('https://npc-backend-ul83.onrender.com/api/products').subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('>> ERROR DE CONEXIÓN CON JAVA:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addProductToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('>> SYSTEM: Producto añadido al inventario:', product.name);
  }
}