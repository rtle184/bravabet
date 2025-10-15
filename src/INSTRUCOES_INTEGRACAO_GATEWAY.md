# 🔧 Instruções para Integrar seu Gateway de Pagamento

## 📋 Passo a Passo

### 1. Configure suas credenciais da API

Abra o arquivo `/services/paymentService.ts` e substitua as informações no objeto `PAYMENT_CONFIG`:

```typescript
const PAYMENT_CONFIG = {
  apiKey: 'SUA_CHAVE_API_AQUI',           // ⚠️ SUBSTITUA com sua API Key
  apiUrl: 'https://api.seuprovedor.com',   // ⚠️ SUBSTITUA com a URL base da API
  
  pixEndpoint: '/v1/pix/payments',         // Endpoint para criar pagamento PIX
  cardEndpoint: '/v1/card/payments',       // Endpoint para pagamento com cartão
  cryptoEndpoint: '/v1/crypto/payments',   // Endpoint para criptomoedas
};
```

---

## 🎯 Exemplos para Gateways Populares

### **Mercado Pago**

```typescript
const PAYMENT_CONFIG = {
  apiKey: 'TEST-1234567890-xxxxxx-xxxxxx',  // Sua Access Token
  apiUrl: 'https://api.mercadopago.com',
  pixEndpoint: '/v1/payments',
  cardEndpoint: '/v1/payments',
};
```

**Documentação:** https://www.mercadopago.com.br/developers/pt/docs

---

### **PagBank (PagSeguro)**

```typescript
const PAYMENT_CONFIG = {
  apiKey: 'seu-token-pagbank',
  apiUrl: 'https://api.pagseguro.com',
  pixEndpoint: '/charges',
  cardEndpoint: '/charges',
};
```

**Documentação:** https://dev.pagbank.uol.com.br/reference

---

### **Stripe**

```typescript
const PAYMENT_CONFIG = {
  apiKey: 'sk_test_xxxxxx',  // Secret Key
  apiUrl: 'https://api.stripe.com',
  pixEndpoint: '/v1/payment_intents',
  cardEndpoint: '/v1/payment_intents',
};
```

**Documentação:** https://stripe.com/docs/api

---

### **Asaas**

```typescript
const PAYMENT_CONFIG = {
  apiKey: 'sua-api-key-asaas',
  apiUrl: 'https://api.asaas.com',
  pixEndpoint: '/v3/payments',
  cardEndpoint: '/v3/payments',
};
```

**Documentação:** https://docs.asaas.com/

---

## 🔄 Adaptar as Funções

### **createPixPayment()**

Esta função precisa ser adaptada para o formato da sua API. Aqui está a estrutura:

```typescript
export async function createPixPayment(request: PaymentRequest): Promise<PixPaymentResponse> {
  const response = await fetch(`${PAYMENT_CONFIG.apiUrl}${PAYMENT_CONFIG.pixEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAYMENT_CONFIG.apiKey}`,
      // Adicione headers específicos do seu gateway
    },
    body: JSON.stringify({
      // ⚠️ ADAPTE estes campos conforme documentação do seu gateway
      amount: request.amount,
      description: 'Depósito Cassino Online',
      payment_method: 'pix',
      // Outros campos necessários...
    }),
  });

  const data = await response.json();

  // ⚠️ ADAPTE o retorno conforme a resposta da sua API
  return {
    qrCode: data.qr_code,              // Campo que contém o PIX Copia e Cola
    qrCodeBase64: data.qr_code_base64, // Imagem QR Code em base64 (opcional)
    pixKey: data.pix_key,              // Chave PIX (opcional)
    transactionId: data.id,            // ID da transação
    expiresAt: data.expires_at,        // Data de expiração
  };
}
```

---

## 🔔 Configurar Webhooks (Importante!)

Webhooks permitem que o gateway notifique seu sistema quando um pagamento é confirmado.

### Como configurar:

1. **No painel do seu gateway**, configure a URL do webhook:
   ```
   https://seu-site.com/api/webhook/payment
   ```

2. **Crie um endpoint no backend** para receber notificações:
   ```typescript
   // Exemplo de endpoint (precisa ser implementado no backend)
   app.post('/api/webhook/payment', (req, res) => {
     const webhookData = req.body;
     
     // Valide a autenticidade do webhook
     // Atualize o status do pagamento no banco de dados
     // Adicione o saldo ao usuário
     
     res.status(200).send('OK');
   });
   ```

3. **No painel do gateway**, escolha os eventos para notificar:
   - ✅ `payment.approved`
   - ✅ `payment.pending`
   - ✅ `payment.rejected`

---

## 🔐 Segurança

### ⚠️ NUNCA exponha sua API Key no frontend!

O código atual tem a API Key no frontend apenas para demonstração. **Para produção:**

1. **Crie um backend** (use Supabase Edge Functions ou outra solução)
2. **Mova toda lógica de pagamento para o backend**
3. **Frontend só envia o valor**, backend processa com o gateway

### Estrutura recomendada:

```
Frontend (React)
    ↓
Backend (Supabase/Node.js)
    ↓
Gateway de Pagamento (Mercado Pago/PagBank/etc)
```

---

## 🧪 Testar a Integração

### 1. **Use o Ambiente de Testes do Gateway**
   - Mercado Pago: Credenciais com prefixo `TEST-`
   - PagSeguro: Sandbox disponível
   - Stripe: Secret key com prefixo `sk_test_`

### 2. **Teste o Fluxo Completo**
   ```
   1. Usuário clica em "Depositar"
   2. Sistema chama createPixPayment()
   3. Exibe QR Code para o usuário
   4. Usuário paga via app do banco
   5. Gateway confirma pagamento via webhook
   6. Sistema atualiza saldo do usuário
   ```

### 3. **Verifique os Logs**
   Abra o Console do navegador (F12) para ver logs de erro ou sucesso.

---

## 📞 Suporte

Se tiver dúvidas sobre integração com um gateway específico, consulte:

- **Mercado Pago:** https://www.mercadopago.com.br/developers/pt/support
- **PagBank:** https://dev.pagbank.uol.com.br/docs/suporte
- **Stripe:** https://stripe.com/docs/support
- **Asaas:** https://www.asaas.com/suporte

---

## ✅ Checklist de Integração

- [ ] Criar conta no gateway de pagamento escolhido
- [ ] Obter credenciais da API (API Key, Token, etc)
- [ ] Substituir valores em `PAYMENT_CONFIG`
- [ ] Adaptar função `createPixPayment()` conforme documentação do gateway
- [ ] Testar em ambiente de desenvolvimento/sandbox
- [ ] Configurar webhooks no painel do gateway
- [ ] Implementar backend seguro (não expor API keys)
- [ ] Testar fluxo completo de depósito
- [ ] Implementar logs e tratamento de erros
- [ ] Migrar para ambiente de produção

---

## 🚀 Pronto!

Após seguir estes passos, seu sistema de pagamento estará integrado e funcional!
