import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DefaultEvent } from '../events/default.event';

@EventsHandler(DefaultEvent)
export class DefaultEventHandler implements IEventHandler<DefaultEvent> {

    handle(event: DefaultEvent) {
        console.info('handling event from DefaultEventHandler\n:', event);
    }
}
