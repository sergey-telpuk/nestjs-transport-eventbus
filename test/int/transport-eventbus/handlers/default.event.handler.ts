/* tslint:disable:max-classes-per-file */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DefaultEvent, DefaultWithoutTransportEvent, RabbitAndDefEvent } from '../events/test.events';
import { Storage } from '../storage/storage';

@EventsHandler(DefaultEvent)
export class DefaultEventHandler implements IEventHandler<DefaultEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: DefaultEvent) {
        this.storage.upsert('DefaultEvent', event.message);
    }
}

@EventsHandler(DefaultWithoutTransportEvent)
export class DefaultWithoutTransportEventHandler implements IEventHandler<DefaultWithoutTransportEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: DefaultWithoutTransportEvent) {
        this.storage.upsert('DefaultWithoutTransportEvent', event.message);
    }
}

@EventsHandler(RabbitAndDefEvent)
export class RabbitAndDefEventHandler implements IEventHandler<RabbitAndDefEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: RabbitAndDefEvent) {
        this.storage.upsert('DefaultEvent', event.message);
    }
}
