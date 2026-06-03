import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = JSON.parse(localStorage.getItem('npc_cart') || '[]');

    private cartSubject = new BehaviorSubject<any[]>(this.cartItems);
    public cart$ = this.cartSubject.asObservable();

    addToCart(product: any) {
        const currentCart = this.cartSubject.value;
        currentCart.push(product);
        localStorage.setItem('npc_cart', JSON.stringify(currentCart));
        this.cartSubject.next(currentCart);
    }

    removeFromCart(index: number) {
        const currentCart = this.cartSubject.value;
        currentCart.splice(index, 1);
        localStorage.setItem('npc_cart', JSON.stringify(currentCart));
        this.cartSubject.next(currentCart);
    }

    getCart() {
        return this.cartSubject.value;
    }

    clearCart() {
        localStorage.removeItem('npc_cart');
        this.cartSubject.next([]);
    }
}