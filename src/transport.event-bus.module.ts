import { DynamicModule, Global, Module } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { TransportEventBusService } from './transport.event-bus.service';
import { ModuleRef } from '@nestjs/core';
import { TransportEventBusPublisher } from './transport.event-bus.publisher';
import { TRANSPORT_EVENT_BUS_PUBLISHER, TRANSPORT_EVENT_BUS_SERVICE } from './constants/transport.event-bus.constants';

@Global()
@Module({})
export class TransportEventBusModule {
    static forRoot(
        {
            publishers = [],
            providers = []
        }
    ): DynamicModule {

        return {
            module: TransportEventBusModule,
            imports: [
                CqrsModule
            ],
            providers: [
                ...publishers,
                ...providers,
                {
                    provide: TRANSPORT_EVENT_BUS_PUBLISHER,
                    useClass: TransportEventBusPublisher
                },
                {
                    provide: TRANSPORT_EVENT_BUS_SERVICE,
                    useFactory: (eventBus: EventBus, moduleRef: ModuleRef) => {
                        return new TransportEventBusService(
                            publishers,
                            eventBus,
                            moduleRef
                        );
                    },
                    inject: [EventBus, ModuleRef],
                },
            ],
            exports: [
                TRANSPORT_EVENT_BUS_SERVICE,
                TRANSPORT_EVENT_BUS_PUBLISHER,
                ...publishers
            ],
        };
    }
}
