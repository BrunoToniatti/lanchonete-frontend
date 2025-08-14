import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Item {
  nome: string;
  preco: number;
}

interface DadosReserva {
  nome: string;
  telefone: string;
  itens: Item[];
  horario: string;
}

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish.html',
  styleUrl: './finish.scss'
})
export class Finish {
  mostrarModal = false;

  // Dados mock para demonstração - em produção viriam de um serviço
  dadosReserva: DadosReserva = {
    nome: 'João Silva',
    telefone: '(11) 99999-9999',
    itens: [
      { nome: 'X-Bacon', preco: 15.90 },
      { nome: 'Batata Frita', preco: 8.50 }
    ],
    horario: '14:30'
  };

  constructor(private router: Router) {}

  calcularTotal(): number {
    return this.dadosReserva.itens.reduce((total, item) => total + item.preco, 0);
  }

  confirmarReserva() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  voltarInicio() {
    this.mostrarModal = false;
    this.router.navigate(['/']);
  }
}
