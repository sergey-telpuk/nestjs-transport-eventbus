import { TransportEventBusType } from '../types/transport.event-bus.type';
import { ITransportEventBus } from '../interfaces/transport.event-bus.interface';
import { IEvent } from '@nestjs/cqrs';

export function TypeTransport(...TYPE: TransportEventBusType[]) {
    return  <T extends new(...args: any[]) => {}>(constructor: T) => {
        return class extends constructor implements ITransportEventBus, IEvent {
            readonly EVENT_NAME: string = constructor.name;
            readonly TRANSPORTS: TransportEventBusType[] = TYPE;
        };
    };
}
