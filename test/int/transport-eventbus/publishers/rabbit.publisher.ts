import {Injectable} from '@nestjs/common';
import {PublisherAbstract} from "../../../../src/abstract/publisher.abstract";
import {Client, ClientProxy, Transport} from "@nestjs/microservices";
import {TransportType} from "../../../../src";


@Injectable()
export class RabbitPublisher extends PublisherAbstract {
    TRANSPORT: TransportType = Transport.RMQ;
    PATTERN = 'event_bus';

    // @Client({
    //     transport: Transport.RMQ,
    //     options: {
    //         urls: ['amqp://rabbit:rabbit@rabbitmq:5672'],
    //         queue: 'event_service_queue',
    //         queueOptions: {
    //             durable: true,
    //         },
    //     },
    // })
    // client: ClientProxy;

    protected async send(pattern: any, data: any) {
        try {
            console.log("===============================")
        } catch (e) {
            console.error("===============================")
        }
    }
}
