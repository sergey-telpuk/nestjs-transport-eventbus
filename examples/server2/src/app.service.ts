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
  accumulate(@TransportEvent() event: IEvent): void {
    this.eventBus.publish(event);
  }
}
