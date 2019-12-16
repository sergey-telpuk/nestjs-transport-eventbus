
[![Build Status](https://travis-ci.org/sergey-telpuk/nestjs-transport-eventbus.svg?branch=master)](https://travis-ci.org/sergey-telpuk/nestjs-transport-eventbus) [![Greenkeeper badge](https://badges.greenkeeper.io/sergey-telpuk/nestjs-transport-eventbus.svg)](https://greenkeeper.io/)

Transport EventBus allows to broadcast messages via variety of transports

**Using** 
Import `TransportEventBusModule` to willing module
```typescript
 TransportEventBusModule.forRoot(
                        {
                            publishers: [],
                            providers: []
                        }
                    )
```
`TransportEventBusModule` applies two arguments 
`publishers` - Type of transport, for example, create `RabbitPublisher`
```typescript
import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport} from '@nestjs/microservices';

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
```
 
`providers` 