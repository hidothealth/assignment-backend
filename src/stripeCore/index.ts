import Stripe from 'stripe';
import { stripe } from './config';

export interface CreatePaymentIntentDto {
  amount: Required<Stripe.PaymentIntentCreateParams>['amount'];
  customer: Required<Stripe.PaymentIntentCreateParams>['customer'];
  applicationFeeAmount: Required<Stripe.PaymentIntentCreateParams>['application_fee_amount'];
  transferDestination: Required<Stripe.PaymentIntentCreateParams.TransferData>['destination'];
  cardCaptureMethod?: Stripe.PaymentIntentCreateParams.PaymentMethodOptions.Card['capture_method'];
  paymentMethodTypes?: Stripe.PaymentIntentCreateParams['payment_method_types'];
  metadata?: Stripe.PaymentIntentCreateParams['metadata'];
}

// https://stripe.com/docs/api/payment_intents
const createPaymentIntent = async ({
  customer,
  amount,
  applicationFeeAmount,
  transferDestination,
  paymentMethodTypes,
  metadata,
}: CreatePaymentIntentDto) => {
  return stripe.paymentIntents.create({
    amount,
    customer,
    confirm: true,
    payment_method: 'card_1L00EpBm9Nzb6XvVGjFqKTiH',
    transfer_data: { destination: transferDestination },
    application_fee_amount: applicationFeeAmount,
    currency: 'EUR',
    setup_future_usage: 'off_session',
    payment_method_types: paymentMethodTypes,
    payment_method_options: { card: { capture_method: 'manual' } },
    metadata,
  });
};

export const StripeCore = {
  createPaymentIntent,
};
