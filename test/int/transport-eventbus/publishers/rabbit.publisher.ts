/* tslint:disable:max-classes-per-file */
import { Injectable } from '@nestjs/common';
import { ClientProxy, ReadPacket, Transport, WritePacket } from '@nestjs/microservices';
import { Publisher } from '../../../../src/decorators/transport.publisher.event-bus.decorator';
import { defer, Observable, } from 'rxjs';
import { Storage } from '../storage/storage';

@Injectable()
export class TestClientProxy extends ClientProxy {
    constructor(
        private storage: Storage
    ) {
        super();
    }

    send<TResult = any, TInput = any>(pattern: any, data: TInput): Observable<any> {
        this.storage.upsert('Rabbit', data['payload']['message']);// tslint:disable-line
        return defer(() => Promise.resolve());
    }

    close(): any {
        return undefined;
    }

    connect(): Promise<any> {
        return undefined;
    }

    protected dispatchEvent<T = any>(packet: ReadPacket<any>): Promise<T> {
        return undefined;
    }

    protected publish(packet: ReadPacket<any>, callback: (packet: WritePacket) => void): any {
        return undefined;
    }
}

@Injectable()
@Publisher(Transport.RMQ)
export class RabbitPublisher {
    constructor(
        private client: TestClientProxy
    ) {
        // TODO
    }

}
