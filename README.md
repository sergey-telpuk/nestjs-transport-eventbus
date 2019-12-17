[![Build Status](https://travis-ci.org/sergey-telpuk/nestjs-transport-eventbus.svg?branch=master)](https://travis-ci.org/sergey-telpuk/nestjs-transport-eventbus) 
[![Greenkeeper badge](https://badges.greenkeeper.io/sergey-telpuk/nestjs-transport-eventbus.svg)](https://greenkeeper.io/)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sergey-telpuk/nestjs-transport-eventbus/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sergey-telpuk/nestjs-transport-eventbus/)
[![codecov](https://codecov.io/gh/sergey-telpuk/nestjs-transport-eventbus/branch/master/graph/badge.svg)](https://codecov.io/gh/sergey-telpuk/nestjs-transport-eventbus)
[![npm](https://img.shields.io/npm/dw/nestjs-transport-eventbus)](https://www.npmjs.com/package/nestjs-transport-eventbus)

## Description
The **nestjs-transport-eventbus** module for [Nest](https://github.com/nestjs/nest).\
**nestjs-transport-eventbus** allows broadcasting events via variety of [nestjs trasports](https://docs.nestjs.com/microservices/basics) in easy way
## Installation
npm i nestjs-transport-eventbus

## Quick Start
Import `TransportEventBusModule` into a willing module, example below:
```typescript
import { TransportEventBusModule } from 'nestjs-transport-eventbus';

@Module({
    imports: [
        TransportEventBusModule
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule {
}
```
`TransportEventBusModule` applies two arguments:\
`publishers` - array of transport publishers which are based on `ClientProxy`\
`providers` - the additional providers for module

### Example with RabbitMQ(RabbitPublisher)
For creating a transport publisher there is enough to implement the following steps:
1. Implement `RabbitPublisher`, example below:\
```typescript
import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport, Client} from '@nestjs/microservices';
import { Publisher } from 'nestjs-transport-eventbus';

@Injectable()
@Publisher(Transport.RMQ)//Choose the appropriate type of transport in this case `RMQ`
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
2. Inject `RabbitPublisher` into `TransportEventBusModule`, example below:
```typescript
import { Module } from '@nestjs/common';
import { TransportEventBusModule } from 'nestjs-transport-eventbus';
import { RabbitPublisher } from '...';

@Module({
    imports: [
        TransportEventBusModule.forRoot({
            publishers: [RabbitPublisher]
        })
    ],
    controllers: [],
    providers: [

    ],
})
export class AppModule {
}
```
3. Create an event for publisher, example below:
```typescript
import { TransportType, ExcludeDef } from 'nestjs-transport-eventbus';
import { Transport } from '@nestjs/microservices';

@TransportType(Transport.RMQ)
export class RabbitEvent {
    constructor(
        readonly message: string
    ) {
    }
}
```
> Notice: By default, events are handling on both sides broadcasting server and receiving server, for changing this situation add `@ExcludeDef()` declaration,
>can look like below:
>\
>....\
>@TransportType(Transport.RMQ)\
>@ExcludeDef()\
>export class RabbitEvent\
>...
>
4.Inject `TRANSPORT_EVENT_BUS_SERVICE`, example below:
```typescript
import { Inject, Injectable } from '@nestjs/common';
import { TRANSPORT_EVENT_BUS_SERVICE } from 'nestjs-transport-eventbus';
import { IEventBus } from '@nestjs/cqrs';
import { DefaultEvent } from '...';
import { RabbitEvent } from '...'
@Injectable()
export class AppService {
  constructor(
      @Inject(TRANSPORT_EVENT_BUS_SERVICE) private readonly eventBus: IEventBus
  ){

  }
  rabbitEvent(): void {
    this.eventBus.publish(new RabbitEvent('Pass some param'));
  }
}
```
> Notice: Events via [AggregateRoot](https://docs.nestjs.com/recipes/cqrs#events) 
```typescript
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TryAggregateRootCommand } from '...';
import { Inject } from '@nestjs/common';
import { TRANSPORT_EVENT_BUS_PUBLISHER } from 'nestjs-transport-eventbus';
import { TestModel } from '...';

@CommandHandler(TryAggregateRootCommand)
export class TryAggregateRootCommandHandler implements ICommandHandler<TryAggregateRootCommand> {
    constructor(
        @Inject(TRANSPORT_EVENT_BUS_PUBLISHER) private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: TryAggregateRootCommand) {
        const {message} = command;
        const aggregator = this.publisher.mergeObjectContext(
            new TestModel()
        );
        aggregator.applyEvent(message);
        aggregator.commit();
    }
}
```
5. For handling the broadcasted event on receiving side can look like the following:
```typescript
import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TRANSPORT_EVENT_BUS_PATTERN, TRANSPORT_EVENT_BUS_SERVICE, TransportEvent } from 'nestjs-transport-eventbus';
import { IEvent, IEventBus } from '@nestjs/cqrs';

@Controller()
export class AppService {

  constructor(
      @Inject(TRANSPORT_EVENT_BUS_SERVICE) private readonly eventBus: IEventBus
  ){

  }
  @EventPattern(TRANSPORT_EVENT_BUS_PATTERN)
  handle(@TransportEvent() event: IEvent): void {
    this.eventBus.publish(event);
  }
```
> Notice: `TRANSPORT_EVENT_BUS_PATTERN`- can pass via .env
### Examples
[Example is presented two services which communicate each other via RabbitMQ](https://github.com/sergey-telpuk/nestjs-transport-eventbus/tree/master/examples)



