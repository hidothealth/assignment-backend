import 'dotenv/config';
import { setupStripeSecretKey } from './stripeCore/config';

// ###################
// Initializes Secrets
// ###################

export const initializeService = async () => {
  if (process.env.STRIPE_API_KEY) {
    setupStripeSecretKey(process.env.STRIPE_API_KEY);
    return;
  }
  throw new Error('STRIPE_API_KEY environment variable missing!');
};
