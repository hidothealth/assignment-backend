import { FastifyPluginAsync } from 'fastify';
import { paymentIntentsRouter } from './routes';

export const paymentIntentsApp: FastifyPluginAsync = async (app) => {
  app.register(paymentIntentsRouter);
};
