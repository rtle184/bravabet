// ⚠️ IMPORTANTE: Em produção, NUNCA use a chave secreta no frontend!
// Este código é apenas para demonstração. Use um backend em produção.

const STRIPE_PUBLIC_KEY = 'pk_live_51SAYDVKB4332LRFRXWa4bo6Sxq6R0TuXK6pcICUiFM1vK9h3sbgl2PG3WIGjgrJZIk2RcMbgtQhJy6twt74fDRGj00nHmo4oN8';
const STRIPE_SECRET_KEY = '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';

export const stripePublicKey = STRIPE_PUBLIC_KEY;

interface PixPaymentData {
  qrCode: string;
  qrCodeText: string;
  expiresAt: string;
  amount: number;
  transactionId: string;
}

interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret?: string;
}

/**
 * Cria um Payment Intent no Stripe
 * ⚠️ ATENÇÃO: Isto deveria ser feito no backend!
 */
export async function createStripePaymentIntent(amount: number): Promise<PaymentIntent> {
  try {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'amount': Math.round(amount * 100).toString(), // Centavos
        'currency': 'brl',
        'payment_method_types[]': 'card',
        'description': 'Depósito BravaBet',
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro ao criar pagamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar Payment Intent:', error);
    throw error;
  }
}

/**
 * Confirma um pagamento com cartão
 * ⚠️ ATENÇÃO: Isto deveria ser feito no backend!
 */
export async function confirmStripePayment(
  paymentIntentId: string,
  paymentMethodId: string
): Promise<{ success: boolean; status: string; message?: string }> {
  try {
    const response = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method': paymentMethodId,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro ao confirmar pagamento');
    }

    const data = await response.json();
    
    return {
      success: data.status === 'succeeded',
      status: data.status,
      message: data.status === 'succeeded' 
        ? 'Pagamento aprovado com sucesso!' 
        : 'Pagamento pendente de confirmação',
    };
  } catch (error: any) {
    console.error('Erro ao confirmar pagamento:', error);
    return {
      success: false,
      status: 'failed',
      message: error.message || 'Erro ao processar pagamento',
    };
  }
}

/**
 * Cria um Payment Method no Stripe
 */
export async function createStripePaymentMethod(cardData: {
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}): Promise<string> {
  try {
    const response = await fetch('https://api.stripe.com/v1/payment_methods', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'type': 'card',
        'card[number]': cardData.number.replace(/\s/g, ''),
        'card[exp_month]': cardData.expMonth.toString(),
        'card[exp_year]': cardData.expYear.toString(),
        'card[cvc]': cardData.cvc,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Dados do cartão inválidos');
    }

    const data = await response.json();
    return data.id;
  } catch (error: any) {
    console.error('Erro ao criar Payment Method:', error);
    throw new Error(error.message || 'Erro ao processar dados do cartão');
  }
}

/**
 * Processa pagamento completo com cartão
 */
export async function processCardPayment(
  amount: number,
  cardData: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  }
): Promise<{ success: boolean; status: string; message?: string; transactionId?: string }> {
  try {
    // Validação básica
    const cardNumber = cardData.number.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return {
        success: false,
        status: 'failed',
        message: 'Número de cartão inválido',
      };
    }

    // Parse expiry (MM/YY)
    const [expMonth, expYear] = cardData.expiry.split('/').map(s => s.trim());
    if (!expMonth || !expYear) {
      return {
        success: false,
        status: 'failed',
        message: 'Data de validade inválida',
      };
    }

    // 1. Criar Payment Intent
    const paymentIntent = await createStripePaymentIntent(amount);

    // 2. Criar Payment Method
    const paymentMethodId = await createStripePaymentMethod({
      number: cardNumber,
      expMonth: parseInt(expMonth),
      expYear: parseInt('20' + expYear),
      cvc: cardData.cvc,
    });

    // 3. Confirmar pagamento
    const result = await confirmStripePayment(paymentIntent.id, paymentMethodId);

    return {
      ...result,
      transactionId: paymentIntent.id,
    };
  } catch (error: any) {
    console.error('Erro ao processar pagamento:', error);
    return {
      success: false,
      status: 'failed',
      message: error.message || 'Erro ao processar pagamento',
    };
  }
}

/**
 * Cria pagamento PIX (simulado - requer gateway brasileiro)
 */
export async function createPixPayment(amount: number): Promise<PixPaymentData> {
  // PIX requer integração com gateway brasileiro (Mercado Pago, PagSeguro, etc)
  // Stripe não suporta PIX nativamente
  
  const transactionId = `pix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const qrCodeText = `00020126580014br.gov.bcb.pix0136${transactionId}520400005303986540${amount.toFixed(2)}5802BR5925BRAVAHET PAGAMENTOS LTDA6009SAO PAULO62070503***6304`;
  
  // Gera QR Code visual
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrCodeText)}`;
  
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  
  return {
    qrCode,
    qrCodeText,
    expiresAt,
    amount,
    transactionId,
  };
}

/**
 * Verifica status de pagamento PIX
 */
export async function checkPixPaymentStatus(transactionId: string): Promise<{
  success: boolean;
  status: 'pending' | 'approved' | 'expired' | 'failed';
  amount?: number;
}> {
  // Simulação - Em produção, consultar gateway brasileiro
  const timestamp = parseInt(transactionId.split('_')[1] || '0');
  const elapsed = Date.now() - timestamp;
  
  // Simula aprovação após 10 segundos (apenas para testes)
  if (elapsed > 10000) {
    return {
      success: true,
      status: 'approved',
      amount: 100,
    };
  }
  
  return {
    success: true,
    status: 'pending',
  };
}

/**
 * Cria saque PIX
 */
export async function createPixWithdrawal(amount: number, pixKey: string): Promise<{
  success: boolean;
  transactionId?: string;
  message: string;
}> {
  // Validação
  if (!pixKey || pixKey.length < 11) {
    return {
      success: false,
      message: 'Chave PIX inválida',
    };
  }
  
  // Simula processamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const transactionId = `wd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    success: true,
    transactionId,
    message: 'Saque solicitado com sucesso! O valor será creditado em até 24 horas.',
  };
}
