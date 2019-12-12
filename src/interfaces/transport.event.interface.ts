import { IEvent } from '@nestjs/cqrs';
import { TransportType } from '../types/transport.type';

export interface ITransportEvent extends IEvent {
    TRANSPORTS?: TransportType[];
}
