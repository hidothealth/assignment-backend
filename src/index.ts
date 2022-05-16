import { initializeService } from './init';
import Fastify from 'fastify';
import { paymentIntentsApp } from './paymentIntents/app';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const app = Fastify({ ignoreTrailingSlash: true });
    await initializeService();
    await app.register(paymentIntentsApp);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`hi.tech-stage listening on ${PORT}`);
    });
  } catch (error) {
    console.error('Crash on startup', { error });
  }
};

start();
