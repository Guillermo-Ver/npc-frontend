import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Importamos el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = true;
  username = '';
  email = '';
  password = '';
  message = '';
  isError = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      const credentials = { email: this.email, password: this.password };

      this.http.post<any>('http://localhost:8080/api/auth/login', credentials).subscribe({
        next: (res) => {
          this.isError = false;
          this.message = '> ACCESS_GRANTED. Iniciando protocolo...';

          // Guardamos el usuario de forma global en la App
          this.authService.login(res.username);

          // Redirección rápida al catálogo
          setTimeout(() => this.router.navigate(['/drops']), 1000);
        },
        error: (err) => {
          this.isError = true;
          this.message = '> ERROR: Credenciales inválidas.';
        }
      });

    } else {
      const newUser = { username: this.username, email: this.email, password: this.password };

      this.http.post<any>('http://localhost:8080/api/auth/register', newUser).subscribe({
        next: (res) => {
          this.isError = false;
          this.message = '> SYSTEM: Registro completado.';
          setTimeout(() => {
            this.password = '';
            this.toggleMode();
          }, 1000);
        },
        error: (err) => {
          this.isError = true;
          this.message = '> ERROR: ' + (err.error.message || 'Error en los datos.');
        }
      });
    }
  }
}