import { EventBus, EventHandlerType, IEvent, IEventBus, IEventHandler, IEventPublisher } from '@nestjs/cqrs';
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { EVENT_NAME, EXCLUDE_DEF, TRANSPORT, TRANSPORTS } from './constants/transport.event-bus.constants';

@Injectable()
export class TransportEventBusService implements IEventBus {
    constructor(
        readonly publishers: any[],
        readonly eventBus: EventBus,
        private readonly moduleRef: ModuleRef
    ) {
    }

    get publisher(): IEventPublisher {
        return this.eventBus.publisher;
    }

    onModuleDestroy(): void {
        this.eventBus.onModuleDestroy();
    }

    bind(handler: IEventHandler<IEvent>, name: string): void {
        this.eventBus.bind(handler, name);
    }

    registerSagas(types?: Array<Type<any>>): void {
        this.eventBus.registerSagas(types);
    }

    register(handlers?: EventHandlerType[]): void {
        this.eventBus.register(handlers);
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
        const transports: Transport[] = event[TRANSPORTS] ? event[TRANSPORTS] : [];// tslint:disable-line
        const isExcludedDef: boolean = !!event[EXCLUDE_DEF] || false;// tslint:disable-line

        delete event[TRANSPORTS];// tslint:disable-line
        delete event[EXCLUDE_DEF];// tslint:disable-line

        for (const publisher of this.publishers) {

            const pub = this.moduleRef.get<IEventPublisher>(publisher);

            if (transports.includes(pub[TRANSPORT])) {// tslint:disable-line
                pub.publish(event);
            }
        }

        if (!isExcludedDef) {
            delete event[EVENT_NAME];// tslint:disable-line
            this.eventBus.publish(event);
        }
    }
}
