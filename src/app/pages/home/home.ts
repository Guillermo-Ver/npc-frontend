import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // Importante para la navegación ultrarrápida
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}