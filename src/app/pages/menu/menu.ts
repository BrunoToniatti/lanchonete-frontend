import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';

interface Lanche {
  nome: string;
  preco: number;
  status: 'disponivel' | 'esgotado';
  foto?: string;
  maisVendido?: boolean;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    ]),
    trigger('chatSlide', [
      state('closed', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('closed => open', [
        animate('0.4s cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('open => closed', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('messageAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px) scale(0.95)' }),
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    trigger('buttonPulse', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class Menu {
  chatAberto = false;
  mensagens: ChatMessage[] = [];
  novaMensagem = '';
  enviando = false;

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

  toggleChat() {
    this.chatAberto = !this.chatAberto;
    if (this.chatAberto && this.mensagens.length === 0) {
      // Mensagem de boas-vindas
      this.mensagens.push({
        text: 'Olá! 👋 Como posso ajudar você hoje?',
        sender: 'bot',
        timestamp: new Date()
      });
    }
  }

  async enviarMensagem() {
    if (this.novaMensagem.trim() && !this.enviando) {
      // Adiciona mensagem do usuário
      this.mensagens.push({
        text: this.novaMensagem,
        sender: 'user',
        timestamp: new Date()
      });

      const mensagemUsuario = this.novaMensagem;
      this.novaMensagem = '';
      this.enviando = true;

      // Mensagem de "digitando..."
      this.mensagens.push({
        text: 'Digitando... ✍️',
        sender: 'bot',
        timestamp: new Date()
      });

      try {
        // Monta o histórico completo da conversa (sem a mensagem "Digitando...")
        const historicoParaIA = this.mensagens
          .filter(msg => msg.text !== 'Digitando... ✍️')
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }));

        // Chama a Netlify Function com o histórico completo
        const response = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: mensagemUsuario,
            historico: historicoParaIA
          })
        });

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const data = await response.json();

        // Remove "Digitando..." e adiciona resposta real
        this.mensagens.pop();
        this.mensagens.push({
          text: data.response,
          sender: 'bot',
          timestamp: new Date()
        });

      } catch (error) {
        // Remove "Digitando..." e mostra erro
        this.mensagens.pop();
        this.mensagens.push({
          text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente! 😔',
          sender: 'bot',
          timestamp: new Date()
        });
        console.error('Erro ao enviar mensagem:', error);
      } finally {
        this.enviando = false;
      }

      // Auto-scroll para última mensagem
      setTimeout(() => {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 100);
    }
  }

  fecharChat() {
    this.chatAberto = false;
  }
}
