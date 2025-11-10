import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface RequestBody {
  message: string;
  historico?: Array<{ role: string; content: string }>;
}

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Apenas aceita POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { message, historico = [] } = JSON.parse(event.body || '{}') as RequestBody;

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Mensagem não fornecida' })
      };
    }

    // Informações completas do cardápio
    const cardapioCompleto = `
# CARDÁPIO COMPLETO - LANCHONETE FSA

## Lanches Disponíveis:

### 🍔 X-BURGUER (Mais Vendido!)
- **Preço:** R$ 12,50
- **Calorias:** 480 kcal
- **Ingredientes:** Pão, hambúrguer bovino (120g), queijo prato, alface, tomate, cebola, maionese caseira
- **Descrição:** Nosso clássico! Hambúrguer suculento com queijo derretido e vegetais frescos
- **Status:** DISPONÍVEL ✅
- **Tempo de preparo:** 10-15 minutos

### 🥗 X-SALADA (Mais Vendido!)
- **Preço:** R$ 13,50
- **Calorias:** 520 kcal
- **Ingredientes:** Pão, hambúrguer bovino (120g), queijo prato, alface, tomate, cebola, cenoura ralada, milho, maionese
- **Descrição:** Opção completa com todos os vegetais frescos do dia
- **Status:** DISPONÍVEL ✅
- **Tempo de preparo:** 10-15 minutos

### 🥓 X-BACON (Mais Vendido!)
- **Preço:** R$ 15,00
- **Calorias:** 650 kcal
- **Ingredientes:** Pão, hambúrguer bovino (120g), queijo prato, bacon crocante (50g), alface, tomate, maionese defumada
- **Descrição:** Para os amantes de bacon! Bacon crocante com maionese defumada especial
- **Status:** ESGOTADO ❌ (previsão de retorno: hoje às 18h)
- **Tempo de preparo:** 12-18 minutos

### 🥪 MISTO QUENTE
- **Preço:** R$ 8,00
- **Calorias:** 320 kcal
- **Ingredientes:** Pão de forma, presunto (50g), queijo mussarela (50g), manteiga
- **Descrição:** O clássico tradicional, perfeito para um lanche rápido
- **Status:** DISPONÍVEL ✅
- **Tempo de preparo:** 5-8 minutos

### 🌭 CACHORRO-QUENTE
- **Preço:** R$ 10,00
- **Calorias:** 420 kcal
- **Ingredientes:** Pão, salsicha de primeira (100g), batata palha, milho, ervilha, queijo ralado, catchup, mostarda, maionese
- **Descrição:** Completo! Com todos os acompanhamentos tradicionais
- **Status:** DISPONÍVEL ✅
- **Tempo de preparo:** 8-12 minutos

### 🍗 X-FRANGO
- **Preço:** R$ 14,00
- **Calorias:** 550 kcal
- **Ingredientes:** Pão, filé de frango grelhado (150g), queijo prato, alface, tomate, milho, maionese de alho
- **Descrição:** Opção mais leve com frango grelhado temperado
- **Status:** ESGOTADO ❌ (previsão de retorno: amanhã)
- **Tempo de preparo:** 15-20 minutos

### 🥚 X-EGG
- **Preço:** R$ 13,00
- **Calorias:** 580 kcal
- **Ingredientes:** Pão, hambúrguer bovino (120g), queijo prato, ovo frito, alface, tomate, maionese
- **Descrição:** Com ovo frito fresquinho! Combinação perfeita
- **Status:** DISPONÍVEL ✅
- **Tempo de preparo:** 12-15 minutos

### 🌟 X-TUDO
- **Preço:** R$ 18,00
- **Calorias:** 780 kcal
- **Ingredientes:** Pão especial, hambúrguer bovino (150g), bacon, calabresa, ovo, queijo prato, queijo mussarela, presunto, alface, tomate, milho, batata palha, maionese especial
- **Descrição:** O MAIS COMPLETO! Todos os ingredientes em um único lanche
- **Status:** DISPONÍVEL ✅
- **Tempo de preparo:** 20-25 minutos

## Informações Gerais:
- **Horário de funcionamento:** Segunda a Sábado, 10h às 22h
- **Forma de pagamento:** Dinheiro, PIX, Cartão (débito/crédito)
- **Delivery:** Disponível via WhatsApp
- **Reservas:** Sistema online através do site
- **Bebidas:** Refrigerantes (R$ 5,00), Sucos naturais (R$ 7,00), Água (R$ 3,00)
- **Porções:** Batata Frita (R$ 12,00), Onion Rings (R$ 15,00)

## Promoções:
- **Combo Estudante:** Qualquer lanche + refrigerante = 15% OFF
- **Terça-feira:** X-Salada com 20% de desconto
- **Sexta-feira:** Compre 2 lanches e ganhe 1 refrigerante
`;

    // Monta mensagens com histórico completo
    const mensagensCompletas: OpenAIMessage[] = [
      {
        role: 'system',
        content: `Você é um assistente virtual da "Lanchonete FSA", uma lanchonete universitária moderna e acolhedora.

CARDÁPIO E INFORMAÇÕES:
${cardapioCompleto}

INSTRUÇÕES DE ATENDIMENTO:
- Seja extremamente simpático, educado e prestativo
- Use emojis para deixar a conversa mais leve e divertida, porém seja rápido na resposta, não escreva muito
- Ajude com informações sobre: cardápio, preços, ingredientes, calorias, status de disponibilidade, horários e formas de pagamento
- Sugira lanches baseado nas preferências do cliente (ex: mais leve, mais calórico, vegetariano, etc.)
- Informe quando um item está esgotado e sugira alternativas
- Mencione promoções quando relevante
- Se perguntarem sobre reservas, explique que podem fazer pelo site
- Seja conciso mas informativo
- Se não souber algo que não está no cardápio, seja honesto e peça desculpas
- Se o usuário for estudante, solicite a matricula ou o RA dele.
- Quando o usuário informar o RA ou a matricula, responda com: "Obrigado, [Nome]! Você está qualificado para o desconto de estudante. Posso ajudar em mais alguma coisa?"
- No final ofereça colocar o lanche para ser feito e reservado para retirada na lanchonete.
- Se o usuário solicitar a reserva, como so tem front-end finja que o lanche já foi e gere um número aleatório para a reserva.
- **IMPORTANTE: LEMBRE-SE e MANTENHA o contexto de toda a conversa anterior**

PERSONALIDADE:
- Jovem, descontraído mas profissional
- Conhecedor do cardápio
- Prestativo e atencioso
- Use gírias leves quando apropriado (ex: "show", "top", "massa")
- IMPORTANTE: Resposta rápiada para não juntar muito histórico

# OBRIGATÓRIO:
Antes de adicionar para reserva confirme se ele tem RA e o nome dele, sempre antes de adicionar o bonus você precisa solciitar RA e o Nome, sem RA e nome não consegue reservar com desconto de estudante

Lembre-se: este é um projeto acadêmico da FSA, então demonstre orgulho da instituição!`
      },
      // Adiciona todo o histórico da conversa
      ...historico.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ];

    // Chama API do OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: mensagensCompletas,
        max_tokens: 300,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json() as OpenAIResponse;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: data.choices[0].message.content
      })
    };

  } catch (error) {
    console.error('Erro na função chat:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Erro ao processar mensagem',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    };
  }
};

export { handler };
