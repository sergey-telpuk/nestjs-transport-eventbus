import { ITransportDataEventBus } from './transport.data.event-bus.interface';
import { TransportEventBusType } from '..';
import { ClientProxy } from '@nestjs/microservices';

export interface ITransportPublisherEventBus {
    readonly TRANSPORT: TransportEventBusType;
    readonly client: ClientProxy;

    // send(data: ITransportDataEventBus): void
}
