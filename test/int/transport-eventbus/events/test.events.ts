/* tslint:disable:max-classes-per-file */
import { Transport } from '@nestjs/common/enums/transport.enum';
import { TransportDefaultTypeEventBusEnum, TypeTransport } from '../../../../src';

export class DefaultWithoutTransportEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TypeTransport(TransportDefaultTypeEventBusEnum.DEF)
export class DefaultEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TypeTransport(Transport.RMQ)
export class RabbitEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TypeTransport(Transport.RMQ, TransportDefaultTypeEventBusEnum.DEF)
export class RabbitAndDefEvent {
    constructor(
        readonly message: string
    ) {
    }
}
