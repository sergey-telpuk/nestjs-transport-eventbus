import 'reflect-metadata';
import { IEvent } from '@nestjs/cqrs';
import { EXCLUDE_DEF } from '../constants/transport.event-bus.constants';

export function ExcludeDef() {
    return <T extends new(...args: any[]) => {}>(constructor: T) => {
        const name = constructor.name;
        const object = class extends constructor implements IEvent {
            readonly [EXCLUDE_DEF] = true;
        };

        Object.defineProperty(object, 'name', {value: name});
        return object;
    };
}
