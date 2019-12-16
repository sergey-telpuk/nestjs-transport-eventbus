/* tslint:disable:max-classes-per-file */
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ExcludeDef } from '../../../../src/decorators/transport.exclude-def.decorator';
import { TransportType } from '../../../../src/decorators/transport.type.event-bus.decorator';

@TransportType()
export class DefaultEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TransportType()
@ExcludeDef()
export class ExcludeDefEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TransportType(Transport.RMQ)
export class RabbitWithDefEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TransportType(Transport.RMQ)
@ExcludeDef()
export class RabbitEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TransportType(Transport.RMQ)
@ExcludeDef()
export class RabbitWithoutDefEvent {
    constructor(
        readonly message: string
    ) {
    }
}

@TransportType(Transport.RMQ)
export class SagaEvent {
    constructor(
        readonly message: string
    ) {
    }
}


@TransportType(Transport.RMQ)
export class TryAggregateRootEvent {
    constructor(
        readonly message: string
    ) {
    }
}
