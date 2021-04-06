import 'reflect-metadata';
import { IEvent } from '@nestjs/cqrs';
import { Transport } from '@nestjs/microservices';
import { EVENT_NAME, TRANSPORTS } from '../constants/transport.event-bus.constants';

export function TransportType(...TYPE: Transport[]) {
    return <T extends new(...args: any[]) => {}>(constructor: T) => {
        const name = constructor.name;
        const object = class extends constructor implements IEvent {
            readonly [EVENT_NAME]: string = name;
            readonly [TRANSPORTS] = TYPE;
        };
        Object.defineProperty(object, 'name', {value: name});
        return object;
    };
}
