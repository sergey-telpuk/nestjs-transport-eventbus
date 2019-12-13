import { INestApplication, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TransportEventBusService } from '../../../src/transport.event-bus.service';
import { TransportEventBusModule } from '../../../src';
import { RabbitPublisher, TestClientProxy } from './publishers/rabbit.publisher';
import { DefaultEvent, DefaultWithoutTransportEvent, RabbitAndDefEvent, RabbitEvent } from './events/test.events';
import { DefaultEventHandler, DefaultWithoutTransportEventHandler } from './handlers/default.event.handler';
import { Storage } from './storage/storage';

describe('Transport EventBus service', () => {
    let app: INestApplication;
    let service: TransportEventBusService;
    let storage: Storage;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule(
            {
                imports: [
                    TransportEventBusModule.forRoot(
                        {
                            publishers: [RabbitPublisher],
                            providers: [Storage, Logger, TestClientProxy]
                        }
                    )
                ],
                providers: [
                    Storage,
                    DefaultEventHandler,
                    DefaultWithoutTransportEventHandler
                ],
                controllers: [],
            },
        ).compile();

        app = moduleFixture.createNestApplication();
        service = moduleFixture.get(TransportEventBusService);
        storage = moduleFixture.get(Storage);

        await app.init();
    });

    describe('Permission', () => {
        it('should call a DefaultEvent handler', () => {
            storage.clear();
            service.publish(new DefaultEvent('DefaultEvent'));
            expect(storage.get('DefaultEvent')).toEqual('DefaultEvent'); // success
        });

        it('should call a DefaultWithoutTransportEvent handler', () => {
            storage.clear();
            service.publish(new DefaultWithoutTransportEvent('DefaultWithoutTransportEvent'));
            expect(storage.get('DefaultWithoutTransportEvent'))
                .toEqual('DefaultWithoutTransportEvent'); // success
        });

        it('should call a RabbitEvent handler', () => {
            storage.clear();
            service.publish(new RabbitEvent('RabbitEvent'));
            expect(storage.get('RabbitEvent')).toEqual('RabbitEvent'); // success
        });
        //
        it('should call a RabbitAndDefEvent handler', () => {
            storage.clear();
            service.publish(new RabbitAndDefEvent('RabbitAndDefEvent'));
            expect(storage.get('RabbitEvent')).toEqual('RabbitAndDefEvent'); // success
            expect(storage.get('DefaultEvent')).toEqual('RabbitAndDefEvent'); // success
        });
    });

    afterAll(async () => {
        await app.close();
        storage.clear();
    });
});
