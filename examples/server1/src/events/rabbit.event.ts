import { TransportType, ExcludeDef } from 'nestjs-transport-eventbus';
import { Transport } from '@nestjs/microservices';

@TransportType(Transport.RMQ)
@ExcludeDef()
export class RabbitEvent {
    constructor(
        readonly message: string
    ) {
    }
}
