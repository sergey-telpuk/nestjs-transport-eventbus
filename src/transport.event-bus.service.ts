import {EventBus, IEvent} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {ModuleRef} from '@nestjs/core';
import {PublisherAbstract} from './abstract/publisher.abstract';
import {ITransportEvent} from './interfaces/transport.event.interface';
import {TransportType} from './types/transport.type';
import {TransportDefault} from './enums/tranport-default.enum';

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
        })
    }

    private publishViaPublisher(event: ITransportEvent): void {
        const transports: TransportType[] = event.TRANSPORTS ? event.TRANSPORTS : [];
        delete event.TRANSPORTS;

        if (transports.length === 0 || transports.includes(TransportDefault.DEF)) {
            this.eventBus.publish(event);
        }

        for (const publisher of this.publishers) {
            const pub = this.moduleRef.get<PublisherAbstract>(publisher);

            if (transports.includes(pub.TRANSPORT)) {
                pub.publish(event);
            }
        }
    }
}
