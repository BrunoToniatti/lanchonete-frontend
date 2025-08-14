import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Item {
  nome: string;
  preco: number;
}

interface Pedido {
  id: string;
  data: string;
  horarioRetirada: string;
  itens: Item[];
  status: 'concluido' | 'cancelado' | 'andamento';
}

@Component({
  selector: 'app-histoy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './histoy.html',
  styleUrl: './histoy.scss'
})
export class Histoy {
  mostrarModalCancelamento = false;
  pedidoParaCancelar = '';

  // Pedido atual em andamento
  pedidoAtual: Pedido | null = {
    id: '2024001',
    data: '13/08/2024',
    horarioRetirada: '14:30',
    itens: [
      { nome: 'X-Bacon', preco: 15.90 },
      { nome: 'Batata Frita', preco: 8.50 }
    ],
    status: 'andamento'
  };

  // Histórico de pedidos anteriores
  historicoPedidos: Pedido[] = [
    {
      id: '2024002',
      data: '10/08/2024',
      horarioRetirada: '12:00',
      itens: [
        { nome: 'X-Salada', preco: 12.90 },
        { nome: 'Refrigerante', preco: 5.00 }
      ],
      status: 'concluido'
    },
    {
      id: '2024003',
      data: '08/08/2024',
      horarioRetirada: '18:15',
      itens: [
        { nome: 'X-Tudo', preco: 18.90 }
      ],
      status: 'concluido'
    },
    {
      id: '2024004',
      data: '05/08/2024',
      horarioRetirada: '16:00',
      itens: [
        { nome: 'X-Calabresa', preco: 14.50 },
        { nome: 'Suco Natural', preco: 6.00 }
      ],
      status: 'cancelado'
    }
  ];

  constructor(private router: Router) {}

  calcularTotal(itens: Item[]): number {
    return itens.reduce((total, item) => total + item.preco, 0);
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      case 'andamento': return 'Em preparo';
      default: return status;
    }
  }

  cancelarPedido(pedidoId: string) {
    this.pedidoParaCancelar = pedidoId;
    this.mostrarModalCancelamento = true;
  }

  confirmarCancelamento() {
    if (this.pedidoAtual && this.pedidoAtual.id === this.pedidoParaCancelar) {
      // Move o pedido atual para o histórico como cancelado
      this.pedidoAtual.status = 'cancelado';
      this.historicoPedidos.unshift(this.pedidoAtual);
      this.pedidoAtual = null;
    }
    this.fecharModal();

    // Mostra mensagem de confirmação
    alert('Pedido cancelado com sucesso!');
  }

  fecharModal() {
    this.mostrarModalCancelamento = false;
    this.pedidoParaCancelar = '';
  }

  voltarOptions() {
    this.router.navigate(['/opcoes']);
  }

  fazerNovoPedido() {
    this.router.navigate(['/initial-page']);
  }
}
