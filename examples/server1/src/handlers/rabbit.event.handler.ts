import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RabbitEvent } from '../events/rabbit.event';

@EventsHandler(RabbitEvent)
export class RabbitEventHandler implements IEventHandler<RabbitEvent> {
    handle(event: RabbitEvent) {
        console.debug('handling event from RabbitEventHandler:\n', event);
    }
}
