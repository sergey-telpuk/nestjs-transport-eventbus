import { ClientProxy } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';

export interface ITransportPublisherEventBus {
    readonly TRANSPORT: Transport;
    readonly client: ClientProxy;
}
