import { Stripe } from 'stripe';

export let stripe: Stripe;

export const setupStripeSecretKey = (secretKey: string) => {
  stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' });
};
