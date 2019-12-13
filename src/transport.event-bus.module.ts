import { DynamicModule, Global, Module } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { TransportEventBusService } from './transport.event-bus.service';
import { ModuleRef } from '@nestjs/core';

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
                    provide: TransportEventBusService,
                    useFactory: (eventBus: EventBus, moduleRef: ModuleRef) => {
                        return new TransportEventBusService(
                            eventBus,
                            moduleRef,
                            publishers,
                        );
                    },
                    inject: [EventBus, ModuleRef],
                },
            ],
            exports: [
                TransportEventBusService,
                ...publishers
            ],
        };
    }
}
