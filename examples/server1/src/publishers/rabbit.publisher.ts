import { Injectable } from '@nestjs/common';
import { Publisher } from 'nestjs-transport-eventbus';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
@Publisher(Transport.RMQ)
export class RabbitPublisher {
    @Client({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rabbit:rabbit@rabbitmq:5672'],
            queue: 'event_service_queue',
            queueOptions: {
                durable: true,
            },
        },
    })
    client: ClientProxy;
}
