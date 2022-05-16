import { HTTPMethods } from 'fastify';

const headersJsonSchema = {
  type: 'object',
  properties: {
    'hi-user-id': { type: 'string' },
  },
  required: ['hi-user-id'],
};

const bodyJsonSchema = {
  type: 'object',
  required: ['amount', 'merchantId', 'paymentId'],
  properties: {
    amount: { type: 'number' },
    merchantId: { type: 'string' },
    paymentId: { type: 'string' },
    paymentMethodTypes: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['SEPA_DEBIT', 'CARD'],
      },
    },
  },
};

const responseJsonSchema = {
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        clientSecret: { type: 'string' },
      },
    },
  },
};

export const createPaymentIntent = {
  url: '/paymentIntents/',
  method: 'POST' as HTTPMethods,
  schema: {
    summary: 'Create a Stripe Payment Intent',
    headers: headersJsonSchema,
    body: bodyJsonSchema,
    description: `<h2>Payment Intents</h2> A Stripe payment intent is used in the front-end for the process of collecting a payment from a customer.
         A PaymentIntent guides you through the process of collecting a payment from your customer. We recommend that you create exactly one PaymentIntent for each order or customer session in your system. You can reference the PaymentIntent later to see the history of payment attempts for a particular session.
         <br>Stripe docs: https://stripe.com/docs/payments/payment-intents</br>
  `,
    response: responseJsonSchema,
  },
};
