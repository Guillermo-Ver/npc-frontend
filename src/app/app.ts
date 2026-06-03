import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
})
export class App implements OnInit {
  username: string | null = null;
  cartCount: number = 0;
  isCartAnimating: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.username = user;
    });

    this.cartService.cart$.subscribe(items => {
      if (items.length > this.cartCount) {
        this.triggerCartAnimation();
      }
      this.cartCount = items.length;
    });
  }

  triggerCartAnimation() {
    this.isCartAnimating = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.isCartAnimating = false;
      this.cdr.detectChanges();
    }, 600);
  }

  logout() {
    this.authService.logout();
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}