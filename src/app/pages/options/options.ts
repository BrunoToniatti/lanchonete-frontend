import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [],
  templateUrl: './options.html',
  styleUrl: './options.scss'
})
export class Options {

  constructor(private router: Router) {}

  fazerReserva() {
    this.router.navigate(['/menu']);
  }

  verReservas() {
    this.router.navigate(['/historico']);
  }
}
