import { FastifyPluginAsync } from 'fastify';
import { createPaymentIntent } from './schemas';
import { PaymentIntentsService, PaymentMethodTypes } from '../services/paymentIntentsService';

interface CustomHeaders {
  'hi-user-id': string;
}

interface CustomBody {
  amount: number;
  merchantId: string;
  paymentId: string;
  paymentMethodTypes?: PaymentMethodTypes[];
}

export const paymentIntentsRouter: FastifyPluginAsync = async (app) => {
  app.route<{ Headers: CustomHeaders; Body: CustomBody }>({
    ...createPaymentIntent,
    handler: async (request) => {
      const { 'hi-user-id': userId } = request.headers;
      const { merchantId, amount, paymentId, paymentMethodTypes } = request.body;

      const paymentIntent = await PaymentIntentsService.createPaymentIntent({
        userId,
        merchantId,
        amount,
        paymentId,
        paymentMethodTypes,
      });

      if (!paymentIntent.client_secret) throw new Error('Payment Intent has no client_secret');

      return {
        data: {
          id: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
        },
      };
    },
  });
};
