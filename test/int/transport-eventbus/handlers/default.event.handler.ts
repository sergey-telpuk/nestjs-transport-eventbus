/* tslint:disable:max-classes-per-file */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DefaultEvent, RabbitWithDefEvent } from '../events/test.events';
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

@EventsHandler(RabbitWithDefEvent)
export class RabbitWithDefEventHandler implements IEventHandler<RabbitWithDefEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: RabbitWithDefEvent) {
        this.storage.upsert('RabbitWithDefEvent', event.message);
    }
}
