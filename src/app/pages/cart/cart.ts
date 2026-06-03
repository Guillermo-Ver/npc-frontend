import { Component, OnInit, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

declare var paypal: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, AfterViewInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  checkoutMessage: string = '';
  isProcessing: boolean = false;
  username: string | null = null;
  acceptedTerms: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private http: HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
      this.cdr.detectChanges();
    });

    this.authService.currentUser$.subscribe(user => {
      this.username = user;
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  ngAfterViewInit() {
    this.initPayPal();
  }

  initPayPal() {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: this.totalPrice.toString(), currency_code: 'EUR' }
          }]
        });
      },

      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {

          this.ngZone.run(() => {
            this.isProcessing = true;
            this.checkoutMessage = `> TRANSACCIÓN DE ${details.payer.name.given_name.toUpperCase()} ACEPTADA. GUARDANDO EN SERVIDOR...`;
            this.cdr.detectChanges();

            const orderData = {
              username: this.username || 'Invitado',
              total: this.totalPrice,
              productsDetails: this.cartItems.map(item => item.name).join(', ')
            };

            this.http.post('https://npc-backend-ul83.onrender.com/api/orders/create', orderData).subscribe({
              next: (res: any) => {
                this.checkoutMessage = `> ORDEN [ID:00${res.orderId}] REGISTRADA EN BASE DE DATOS. VACIANDO INVENTARIO...`;
                this.cdr.detectChanges();

                setTimeout(() => {
                  this.cartService.clearCart();
                  this.isProcessing = false;
                  this.checkoutMessage = '> GRACIAS POR MEJORAR TU SKIN.';
                  this.cdr.detectChanges();
                }, 3000);
              },
              error: (err) => {
                this.checkoutMessage = '> PAGO RECIBIDO PERO HUBO UN ERROR AL GUARDAR LA ORDEN.';
                this.isProcessing = false;
                this.cdr.detectChanges();
              }
            });
          });

        });
      },

      onError: (err: any) => {
        this.ngZone.run(() => {
          this.checkoutMessage = '> ERROR EN LA CONEXIÓN SECURE_PAY. INTÉNTALO DE NUEVO.';
          this.cdr.detectChanges();
        });
      }

    }).render('#paypal-button-container');
  }
}