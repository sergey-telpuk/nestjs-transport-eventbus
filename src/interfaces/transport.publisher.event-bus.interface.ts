import { ClientProxy } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import {TRANSPORT} from "../constants/transport.event-bus.constants";

export interface ITransportPublisherEventBus {
    readonly [TRANSPORT]: Transport;
    readonly client: ClientProxy;
}
