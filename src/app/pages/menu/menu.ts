import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

interface Lanche {
  nome: string;
  preco: number;
  status: 'disponivel' | 'esgotado';
  foto?: string;
  maisVendido?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  animations: [
    trigger('listAnim', [
      transition(':enter', [
        query('.lanche-card', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
          stagger(120, [
            animate('0.5s cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.7s 0.2s cubic-bezier(.4,0,.2,1)', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class Menu {

  constructor(
    private router: Router
  ) {}
  lanches: Lanche[] = [
    {
      nome: 'X-Burguer',
      preco: 12.5,
      status: 'disponivel',
      foto: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      maisVendido: true
    },
    {
      nome: 'X-Salada',
      preco: 13.5,
      status: 'disponivel',
      foto: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=400&q=80',
      maisVendido: true
    },
    {
      nome: 'X-Bacon',
      preco: 15.0,
      status: 'esgotado',
      foto: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80',
      maisVendido: true
    },
    {
      nome: 'Misto Quente',
      preco: 8.0,
      status: 'disponivel',
      foto: 'https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      nome: 'Cachorro-Quente',
      preco: 10.0,
      status: 'disponivel',
      foto: 'https://images.unsplash.com/photo-1612392021648-c7df6b16f49b?auto=format&fit=crop&w=400&q=80'
    },
    {
      nome: 'X-Frango',
      preco: 14.0,
      status: 'esgotado',
      foto: 'https://images.unsplash.com/photo-1606755962773-d324e2dabd52?auto=format&fit=crop&w=400&q=80'
    },
    {
      nome: 'X-Egg',
      preco: 13.0,
      status: 'disponivel',
      foto: 'https://images.pexels.com/photos/6529599/pexels-photo-6529599.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      nome: 'X-Tudo',
      preco: 18.0,
      status: 'disponivel',
      foto: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80'
    }
  ];

  get lanchesOrdenados() {
    // Mais vendidos no topo, depois disponíveis, depois esgotados
    return this.lanches.slice().sort((a, b) => {
      if ((a.maisVendido ? -1 : 1) !== (b.maisVendido ? -1 : 1)) {
        return a.maisVendido ? -1 : 1;
      }
      if (a.status !== b.status) {
        return a.status === 'disponivel' ? -1 : 1;
      }
      return 0;
    });
  }

  adicionarReserva(lanche: Lanche) {
    // Aqui você pode integrar com serviço de reserva
    // alert(`Lanche adicionado à reserva: ${lanche.nome}`);
    this.router.navigateByUrl('/retirada');
  }

  voltarOptions() {
    this.router.navigate(['/opcoes']);
  }
}
