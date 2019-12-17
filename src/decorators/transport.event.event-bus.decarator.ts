import { createParamDecorator } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { ITransportDataEventBus } from '../interfaces/transport.data.event-bus.interface';

export const TransportEvent = createParamDecorator((_, data: any): IEvent => {
    if (!data) {
        return;
    }
    const object: ITransportDataEventBus = data.find((i: ITransportDataEventBus) => i.payload && i.eventName);
    if (!object) {
        return;
    }

    const anonymousClass = class {};
    Object.defineProperty(anonymousClass, 'name', {value: object.eventName});
    const newObject = new anonymousClass();
    Object.keys(object.payload).forEach((prop) => {
        newObject[prop] = object.payload[prop];
    });

    return newObject;
});
