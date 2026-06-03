import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-drop-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drop-detail.html',
  styleUrl: './drop-detail.css'
})
export class DropDetail implements OnInit {
  product: any = null;
  loading: boolean = true;
  isGlowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private cdr: ChangeDetectorRef // <-- El martillo para forzar el repintado
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get(`http://localhost:8080/api/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        this.cdr.detectChanges(); // Obligamos a pintar los datos
      },
      error: (err) => {
        console.error('>> ERROR: Producto no encontrado', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);

    this.isGlowing = true;
    this.cdr.detectChanges(); // Repinta el botón a verde neón

    setTimeout(() => {
      this.isGlowing = false;
      this.cdr.detectChanges(); // Vuelve al estado original
    }, 2000);
  }
}