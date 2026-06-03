import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Comprobamos si ya había un usuario guardado al encender la web
    private currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
    public currentUser$ = this.currentUserSubject.asObservable();

    login(username: string) {
        localStorage.setItem('username', username);
        this.currentUserSubject.next(username);
    }

    logout() {
        localStorage.removeItem('username');
        this.currentUserSubject.next(null);
    }

    getUsername(): string | null {
        return this.currentUserSubject.value;
    }
}