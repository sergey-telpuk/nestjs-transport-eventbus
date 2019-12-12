import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {TransportEventBusService} from "../../../src/transport.event-bus.service";
import {TransportEventBusModule} from "../../../src";
import {RabbitPublisher} from "./publishers/rabbit.publisher";
import {DefaultEvent} from "./events/DefaultEvent";
import {DefaultEventHandler} from "./handlers/DefaultEventHandler";
import {Storage} from "./storage/storage";

describe('Transport EventBus service', () => {
    let app: INestApplication;
    let service: TransportEventBusService;
    let storage: Storage;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule(
            {
                imports: [
                    TransportEventBusModule.forRoot(
                        [
                            RabbitPublisher
                        ],
                    )
                ],
                providers: [
                    Storage,
                    DefaultEventHandler
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
        it('should call a default event handler for DefaultEvent', () => {
            storage.clear();
            service.publish(new DefaultEvent());

            expect(storage.get("DefaultEvent")).toEqual(true); // success
        });
    });

    afterAll(async () => {
        await app.close();
    });
});