import { Inject, Injectable } from '@nestjs/common';
import { IEventBus } from '@nestjs/cqrs';
import { TRANSPORT_EVENT_BUS_SERVICE } from '../../../../src/constants/transport.event-bus.constants';

@Injectable()
export class TestEventService {
    constructor(
        @Inject(TRANSPORT_EVENT_BUS_SERVICE) private readonly eventBus: IEventBus
    ) {
        // TODO
    }

    publishEvent(event: any) {
        this.eventBus.publish(event);
    }
}
