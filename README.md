[![Build Status](https://travis-ci.org/sergey-telpuk/nestjs-transport-eventbus.svg?branch=master)](https://travis-ci.org/sergey-telpuk/nestjs-transport-eventbus) 
[![Greenkeeper badge](https://badges.greenkeeper.io/sergey-telpuk/nestjs-transport-eventbus.svg)](https://greenkeeper.io/)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sergey-telpuk/nestjs-transport-eventbus/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sergey-telpuk/nestjs-transport-eventbus/)
[![codecov](https://codecov.io/gh/sergey-telpuk/nestjs-transport-eventbus/branch/master/graph/badge.svg)](https://codecov.io/gh/sergey-telpuk/nestjs-transport-eventbus)
[![npm](https://img.shields.io/npm/dw/nestjs-transport-eventbus)](https://www.npmjs.com/package/nestjs-transport-eventbus)

## Description
The **transport-eventbus** module for [Nest](https://github.com/nestjs/nest).

## Installation
npm i nestjs-transport-eventbus

## Quick Start
Import `TransportEventBusModule` to a willing module
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