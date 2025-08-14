import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './initial-page.html',
  styleUrls: ['./initial-page.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.7s cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class InitialPage {

  constructor(
    private route: Router
  ){}
  telefone: string = '';
  nome: string = '';

  onTelefoneInput(event: any) {
    // Remove todos os caracteres não numéricos
    let numbers = event.target.value.replace(/\D/g, '');

    // Limita a 11 dígitos (DDD + 9 dígitos)
    numbers = numbers.slice(0, 11);

    // Aplica a máscara (XX) XXXXX-XXXX
    let formatted = '';
    if (numbers.length > 0) {
      if (numbers.length <= 2) {
        formatted = `(${numbers}`;
      } else if (numbers.length <= 7) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      }
    }

    event.target.value = formatted;
    this.telefone = formatted;
  }

  onSubmit() {
    // Remove a formatação para salvar apenas os números
    const telefoneNumeros = this.telefone.replace(/\D/g, '');
    // alert(`Bem-vindo, ${this.nome}! Telefone: ${telefoneNumeros}`);
    this.route.navigateByUrl('/opcoes');
  }
}
