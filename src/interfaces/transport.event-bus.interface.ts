import { TransportEventBusType } from '../types/transport.event-bus.type';
import { IEvent } from '@nestjs/cqrs';

export interface ITransportEventBus extends IEvent {
    TRANSPORTS: TransportEventBusType[];
}
