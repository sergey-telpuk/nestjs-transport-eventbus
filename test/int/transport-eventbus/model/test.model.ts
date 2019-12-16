import { AggregateRoot } from '@nestjs/cqrs';
import { TryAggregateRootEvent } from '../events/test.events';

export class TestModel extends AggregateRoot {
    constructor() {
        super();
    }
    applyEvent(message: string) {
        this.apply(new TryAggregateRootEvent(message));
    }
}
