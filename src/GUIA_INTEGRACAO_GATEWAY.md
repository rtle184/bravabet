# 🎯 Guia Completo: Como Integrar Gateway de Pagamento

## 📌 Status Atual

✅ **Modal de Depósito Criado**  
✅ **Estrutura de Pagamento Preparada**  
✅ **Stripe PIX Integrado (simulado)**  
⚠️ **Requer Gateway Brasileiro para PIX Real**

---

## 🚀 3 Opções de Gateway para seu Cassino

### **Opção 1: Mercado Pago** ⭐ RECOMENDADO
- ✅ PIX instantâneo
- ✅ Cartão de crédito
- ✅ API simples
- ✅ Popular no Brasil
- 💰 Taxa: ~2,99% + R$0,39 por transação

**Como Integrar:**
```typescript
// 1. Crie conta em: https://www.mercadopago.com.br/developers
// 2. Obtenha suas credenciais (Access Token)
// 3. Configure em /services/paymentService.ts:

const PAYMENT_CONFIG = {
  apiKey: 'APP_USR-xxxx-xxxxxxxx-xxxx', // Seu Access Token
  apiUrl: 'https://api.mercadopago.com',
  pixEndpoint: '/v1/payments',
  cardEndpoint: '/v1/payments',
};
```

---

### **Opção 2: PagBank (PagSeguro)** 
- ✅ PIX instantâneo
- ✅ Cartão de crédito
- ✅ Boleto bancário
- 💰 Taxa: ~3,99% por transação

**Como Integrar:**
```typescript
// 1. Crie conta em: https://pagseguro.uol.com.br/
// 2. Ative PagBank: https://dev.pagbank.uol.com.br/
// 3. Configure:

const PAYMENT_CONFIG = {
  apiKey: 'seu-token-pagbank',
  apiUrl: 'https://api.pagseguro.com',
  pixEndpoint: '/charges',
  cardEndpoint: '/charges',
};
```

---

### **Opção 3: Asaas**
- ✅ PIX instantâneo
- ✅ Cartão de crédito
- ✅ Boleto bancário
- 💰 Taxa: ~1,99% por transação (mais baixa!)

**Como Integrar:**
```typescript
// 1. Crie conta em: https://www.asaas.com/
// 2. Obtenha API Key no painel
// 3. Configure:

const PAYMENT_CONFIG = {
  apiKey: 'sua-api-key-asaas',
  apiUrl: 'https://api.asaas.com',
  pixEndpoint: '/v3/payments',
  cardEndpoint: '/v3/payments',
};
```

---

## 📝 Passo a Passo para Integrar

### **PASSO 1: Escolha seu Gateway**
Recomendação: **Mercado Pago** (mais popular e fácil)

### **PASSO 2: Crie sua Conta**
1. Acesse o site do gateway escolhido
2. Crie uma conta empresarial
3. Ative o modo desenvolvedor/sandbox
4. Obtenha suas credenciais de API

### **PASSO 3: Configure as Credenciais**

Abra o arquivo `/services/paymentService.ts` e edite:

```typescript
const PAYMENT_CONFIG = {
  apiKey: 'COLE_SUA_API_KEY_AQUI',
  apiUrl: 'https://api.seuprovedor.com',
  pixEndpoint: '/endpoint-pix',
  cardEndpoint: '/endpoint-cartao',
};
```

### **PASSO 4: Adapte a Função createPixPayment**

Exemplo para **Mercado Pago**:

```typescript
export async function createPixPayment(request: PaymentRequest): Promise<PixPaymentResponse> {
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAYMENT_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      transaction_amount: request.amount,
      description: 'Depósito BravaBet',
      payment_method_id: 'pix',
      payer: {
        email: request.userEmail || 'cliente@email.com',
      },
    }),
  });

  const data = await response.json();

  return {
    qrCode: data.point_of_interaction.transaction_data.qr_code_base64,
    qrCodeText: data.point_of_interaction.transaction_data.qr_code,
    pixKey: '',
    transactionId: data.id.toString(),
    expiresAt: data.date_of_expiration,
  };
}
```

### **PASSO 5: Configure Webhooks**

Webhooks são essenciais para saber quando o pagamento foi aprovado!

1. No painel do seu gateway, configure a URL do webhook:
   ```
   https://seu-dominio.com/api/webhook/payment
   ```

2. Selecione os eventos:
   - ✅ `payment.created`
   - ✅ `payment.approved`
   - ✅ `payment.cancelled`

3. Quando receber a notificação, atualize o saldo do usuário

### **PASSO 6: Teste em Ambiente Sandbox**

Todos os gateways têm ambiente de teste:

- **Mercado Pago**: Use credenciais TEST
- **PagBank**: Ative o sandbox no painel
- **Asaas**: Crie conta sandbox

---

## 🎮 Fluxo Completo na sua Aplicação

```
1. Usuário clica no jogo
   ↓
2. Se não logado → Modal Login/Cadastro
   ↓
3. Após login → Modal de Depósito (DepositModal.tsx)
   ↓
4. Usuário seleciona PIX ou Cartão
   ↓
5. Sistema chama seu gateway de pagamento
   ↓
6. Para PIX: Exibe QR Code
   Para Cartão: Processa pagamento
   ↓
7. Gateway confirma pagamento (webhook)
   ↓
8. Sistema atualiza saldo do usuário
   ↓
9. Usuário pode jogar!
```

---

## 🔐 Segurança - MUITO IMPORTANTE!

### ⚠️ NUNCA FAÇA ISSO:
```javascript
// ❌ API Key no frontend (código atual)
const apiKey = 'sua-chave-secreta';
```

### ✅ FAÇA ASSIM (Produção):

**1. Crie um Backend** (Node.js, PHP, Python, etc)

**2. Frontend chama seu backend:**
```javascript
// Frontend
const response = await fetch('https://seu-backend.com/api/criar-pagamento', {
  method: 'POST',
  body: JSON.stringify({ amount: 100 })
});
```

**3. Backend chama o gateway:**
```javascript
// Backend (Node.js)
app.post('/api/criar-pagamento', async (req, res) => {
  const { amount } = req.body;
  
  // Use a chave secreta aqui (seguro!)
  const payment = await mercadopago.payment.create({
    transaction_amount: amount,
    payment_method_id: 'pix',
  });
  
  res.json(payment);
});
```

---

## 📊 Onde Editar no Seu Código

### **Arquivo Principal: `/components/DepositModal.tsx`**
- ✅ Modal de depósito funcional
- ✅ Seleção de método (PIX/Cartão)
- ✅ Exibição de QR Code
- ✅ Validações de valor

### **Serviço de Pagamento: `/services/paymentService.ts`**
- 📝 Configure suas credenciais aqui
- 📝 Adapte as funções para seu gateway

### **Stripe (já configurado): `/services/stripeService.ts`**
- ⚠️ Tem chaves reais expostas (inseguro!)
- 💡 Use apenas para testes
- 🔒 Mova para backend em produção

---

## 🧪 Testar a Integração

### 1. **Ambiente de Teste**
Use sempre credenciais de teste primeiro!

### 2. **Teste o Fluxo:**
```
✅ Abrir modal de depósito
✅ Selecionar método de pagamento
✅ Inserir valor
✅ Gerar QR Code PIX
✅ Copiar código PIX
✅ Verificar expiração
```

### 3. **Logs no Console:**
Abra o DevTools (F12) e veja os logs:
```javascript
console.log('Pagamento criado:', paymentData);
```

---

## 💡 Dicas Importantes

### ✅ Use HTTPS em produção
```
https://bravabet.com ✅
http://bravabet.com ❌
```

### ✅ Valide valores
- Mínimo: R$ 20,00
- Máximo: R$ 10.000,00

### ✅ Implemente timeout
- QR Code expira em 30 minutos

### ✅ Notifique o usuário
- Use toast para feedback
- Mostre status do pagamento

---

## 📞 Suporte dos Gateways

- **Mercado Pago**: https://www.mercadopago.com.br/developers/pt/support
- **PagBank**: https://dev.pagbank.uol.com.br/docs/suporte
- **Asaas**: https://www.asaas.com/suporte
- **Stripe**: https://stripe.com/docs/support

---

## ✅ Checklist Final

- [ ] Escolhi meu gateway de pagamento
- [ ] Criei conta no gateway
- [ ] Obtive credenciais de API (sandbox)
- [ ] Configurei em `/services/paymentService.ts`
- [ ] Testei geração de PIX
- [ ] Testei pagamento com cartão
- [ ] Configurei webhooks
- [ ] Testei recebimento de notificações
- [ ] Planejei migração para backend
- [ ] Testei em ambiente de produção
- [ ] Revisei segurança

---

## 🚀 Próximos Passos

1. ✅ **Escolha seu gateway** (recomendo Mercado Pago)
2. ✅ **Crie sua conta** no gateway
3. ✅ **Configure as credenciais** no código
4. ✅ **Teste em sandbox** antes de ir ao ar
5. ✅ **Implemente backend** para segurança
6. ✅ **Configure webhooks** para automação
7. ✅ **Vá ao ar!** 🎉

---

**Dúvidas?** 
- Consulte a documentação do gateway escolhido
- Teste sempre em ambiente sandbox primeiro
- Nunca exponha chaves secretas no frontend

**Boa sorte com sua integração!** 🍀
