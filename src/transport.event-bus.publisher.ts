import { Injectable } from '@nestjs/common';
import { IEvent, AggregateRoot } from '@nestjs/cqrs';
import { TransportEventBusService } from './transport.event-bus.service';

export type Constructor<T> = new (...args: any[]) => T;

@Injectable()
export class EventPublisherTransport {
  constructor(private readonly eventBus: TransportEventBusService) {}

  mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T {
    const eventBus = this.eventBus;
    /* tslint:disable */
    return class extends metatype {
      publish(event: IEvent) {
        eventBus.publish(event);
      }
    };
  }

  mergeObjectContext<T extends AggregateRoot>(object: T): T {
    const eventBus = this.eventBus;
    object.publish = (event: IEvent) => {
      eventBus.publish(event);
    };
    return object;
  }
}
