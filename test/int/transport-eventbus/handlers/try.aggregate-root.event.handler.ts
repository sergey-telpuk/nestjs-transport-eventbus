/* tslint:disable:max-classes-per-file */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Storage } from '../storage/storage';
import { SagaEvent, TryAggregateRootEvent } from '../events/test.events';

@EventsHandler(TryAggregateRootEvent)
export class TryAggregateRootEventHandler implements IEventHandler<TryAggregateRootEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: TryAggregateRootEvent) {
        this.storage.upsert('TryAggregateRootEvent', event.message);
    }
}

@EventsHandler(SagaEvent)
export class SagaEventHandler implements IEventHandler<SagaEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: SagaEvent) {
        this.storage.upsert('SagaEventHandler', event.message);
    }
}
