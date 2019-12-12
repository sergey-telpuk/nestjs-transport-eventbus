import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {DefaultEvent} from "../events/DefaultEvent";
import {Storage} from "../storage/storage";

@EventsHandler(DefaultEvent)
export class DefaultEventHandler implements IEventHandler<DefaultEvent> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    handle(event: DefaultEvent) {
        this.storage.upsert("DefaultEvent", true)
    }
}