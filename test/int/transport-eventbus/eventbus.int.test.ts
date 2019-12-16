import { INestApplication, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TransportEventBusModule } from '../../../src/transport.event-bus.module';
import { RabbitPublisher, TestClientProxy } from './publishers/rabbit.publisher';
import {
    DefaultEvent,
    ExcludeDefEvent,
    RabbitEvent,
    RabbitWithDefEvent,
    RabbitWithoutDefEvent, SagaEvent,
} from './events/test.events';
import { DefaultEventHandler, RabbitWithDefEventHandler } from './handlers/default.event.handler';
import { Storage } from './storage/storage';
import { TrySagaCommandHandler } from './handlers/try.saga.command.handler';
import { TrySagaHandler } from './handlers/try.saga.handler';
import { TestEventService } from './service/test.service';
import { CommandBus, CqrsModule, IEventBus } from '@nestjs/cqrs';
import { TryAggregateRootCommand } from './commands/try.aggregate-root.command';
import { TryAggregateRootCommandHandler } from './handlers/try.aggregate-root.command.handler';
import { SagaEventHandler, TryAggregateRootEventHandler } from './handlers/try.aggregate-root.event.handler';
import { TRANSPORT_EVENT_BUS_SERVICE } from '../../../src/constants/transport.event-bus.constants';

describe('Transport EventBus service', () => {
    let app: INestApplication;
    let service: IEventBus;
    let storage: Storage;
    let testEventService: TestEventService;
    let commandBus: CommandBus;

    beforeEach(() => {
        storage.clear();
    });

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule(
            {
                imports: [
                    CqrsModule,
                    TransportEventBusModule.forRoot(
                        {
                            publishers: [RabbitPublisher],
                            providers: [Storage, Logger, TestClientProxy]
                        }
                    )
                ],
                providers: [
                    Storage,
                    TestEventService,
                    // //events handlers
                    DefaultEventHandler,
                    RabbitWithDefEventHandler,
                    TryAggregateRootEventHandler,
                    TrySagaCommandHandler,
                    TrySagaHandler,
                    // //command handlers
                    TryAggregateRootCommandHandler,
                    SagaEventHandler

                ],
                controllers: [],
            },
        ).compile();

        app = moduleFixture.createNestApplication();
        service = moduleFixture.get<IEventBus>(TRANSPORT_EVENT_BUS_SERVICE);
        storage = moduleFixture.get(Storage);
        testEventService = moduleFixture.get(TestEventService);
        commandBus = moduleFixture.get(CommandBus);

        await app.init();
    });

    describe('Transport Events', () => {
        it('should call a DefaultEvent handler', () => {
            service.publish(new DefaultEvent('DefaultEvent'));
            expect(storage.get('DefaultEvent')).toEqual('DefaultEvent'); // success
        });

        it('shouldn\'t call a ExcludeDefHandlerEvent handler', () => {
            service.publish(new ExcludeDefEvent('ExcludeDefEvent'));
            expect(storage.get('ExcludeDefEvent')).toEqual(false); // success
        });

        it('should call a RabbitWithDefEvent handler', () => {
            service.publish(new RabbitWithDefEvent('RabbitWithDefEvent'));
            expect(storage.get('Rabbit')).toEqual('RabbitWithDefEvent'); // success
            expect(storage.get('RabbitWithDefEvent')).toEqual('RabbitWithDefEvent'); // success
        });

        it('should call a RabbitAndDefEvent handler', () => {
            service.publish(new RabbitWithoutDefEvent('RabbitWithoutDefEvent'));
            expect(storage.get('Rabbit')).toEqual('RabbitWithoutDefEvent'); // success
            expect(storage.get('DefaultEvent')).toEqual(false); // success
        });

        it('should call both DefaultEvent and RabbitEvent handler', () => {
            service.publishAll([
                new DefaultEvent('DefaultEvent'),
                new RabbitEvent('RabbitEvent')
            ]);
            expect(storage.get('DefaultEvent')).toEqual('DefaultEvent'); // success
            expect(storage.get('Rabbit')).toEqual('RabbitEvent'); // success
        });
    });

    describe('Transport Events with Saga', () => {
        it('should call SagaEvent', () => {
            service.publish(new SagaEvent('SagaEvent'));
            expect(storage.get('TrySagaCommand')).toEqual('SagaEvent'); // success
        });
    });

    describe('Service di', () => {
        it('should call RabbitEvent', () => {
            testEventService.publishEvent(new RabbitWithDefEvent('RabbitWithDefEvent'));
            expect(storage.get('RabbitWithDefEvent')).toEqual('RabbitWithDefEvent'); // success
        });
    });


    describe('Transport Events with AggregateRoot', () => {
        it('should call', () => {
            commandBus.execute(new TryAggregateRootCommand('TryAggregateRootEvent'));
            expect(storage.get('TryAggregateRootEvent')).toEqual('TryAggregateRootEvent'); // success
        });
    });

    afterAll(async () => {
        await app.close();
        storage.clear();
    });
});
