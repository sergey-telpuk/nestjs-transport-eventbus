import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const log = new Logger('rabbit-service: ');

(async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: log,
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbit:rabbit@rabbitmq:5672'],
      queue: 'event_service_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen(() => {
    log.verbose('rabbit service is running.');
  });
})();
