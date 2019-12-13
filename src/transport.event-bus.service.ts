import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TransportEventBusType } from './types/transport.event-bus.type';
import { TransportDefaultTypeEventBusEnum } from './enums/transport.default-type.event-bus.enum';

@Injectable()
export class TransportEventBusService {

    constructor(
        private readonly eventBus: EventBus,
        private readonly moduleRef: ModuleRef,
        private readonly publishers: any[],
    ) {
    }

    publish<T extends IEvent>(event: T): void {
        this.publishViaPublisher(event);
    }

    publishAll<T extends IEvent>(events: T[]): void {
        events.forEach((event: T) => {
            this.publishViaPublisher(event);
        });
    }

    private publishViaPublisher<T extends IEvent>(event: T): void {
        const transports: TransportEventBusType[] = event.TRANSPORTS ? event.TRANSPORTS : [];

        delete event.TRANSPORTS;

        if (transports.length === 0 || transports.includes(TransportDefaultTypeEventBusEnum.DEF)) {
            this.eventBus.publish(event);
        }

        for (const publisher of this.publishers) {

            const pub = this.moduleRef.get<IEventPublisher>(publisher);

            if (transports.includes(pub.TRANSPORT)) {
                pub.publish(event);
            }
        }
    }
}
