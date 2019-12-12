import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {TransportType} from "..";

@Injectable()
export abstract class PublisherAbstract implements IEventPublisher {
    abstract TRANSPORT: TransportType;
    abstract PATTERN: string;

    publish<T extends IEvent>(event: T): void {

        const data = {
            payload: event,
            event: event.constructor.name,
        };

        this.send(this.PATTERN, data);
    }

    protected abstract send(pattern: any, data: any): any;
}
