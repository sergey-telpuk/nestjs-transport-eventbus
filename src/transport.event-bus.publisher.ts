import { Inject, Injectable } from '@nestjs/common';
import { EventBus, EventPublisher } from '@nestjs/cqrs';
import { TRANSPORT_EVENT_BUS_SERVICE } from './constants/transport.event-bus.constants';

@Injectable()
export class TransportEventBusPublisher extends EventPublisher {
  constructor(
      @Inject(TRANSPORT_EVENT_BUS_SERVICE) private readonly iEventBus: EventBus
  ) {
      super(iEventBus);
  }
}
