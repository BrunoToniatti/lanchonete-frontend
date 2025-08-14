import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retirada',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './retirada.html',
  styleUrls: ['./retirada.scss']
})
export class Retirada {
  horario: string = '';

  constructor(private router: Router) {}

  onSubmit() {
        this.router.navigate(['/finalizar']);
  }

  voltarMenu() {
    this.router.navigate(['/menu']);
  }
}
