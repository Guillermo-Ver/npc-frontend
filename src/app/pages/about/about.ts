import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  contactData = { name: '', email: '', message: '' };
  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;

    setTimeout(() => {
      this.contactData = { name: '', email: '', message: '' };
      this.isSubmitted = false;
    }, 3000);
  }
}