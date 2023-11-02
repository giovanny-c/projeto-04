import express from 'express';
import RabbitMQServer from '@shared/rabbitMQ/rabbitMQ-server';
const rabbitmq_router = express.Router();

rabbitmq_router.post('/express', async function(req, res, next) {
  
  const server = new RabbitMQServer('amqp://admin:admin@rabbitmq:5672');
  await server.start();
  await server.publishInQueue('queue1', JSON.stringify(req.body));
  await server.publishInExchange('amq.direct', 'rota', JSON.stringify(req.body));
  res.send(req.body);
});

export default rabbitmq_router;