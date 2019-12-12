import {DynamicModule, Global, Module} from '@nestjs/common';
import {CqrsModule, EventBus} from '@nestjs/cqrs';
import {TransportEventBusService} from './transport.event-bus.service';
import {ModuleRef} from '@nestjs/core';

@Global()
@Module({
    providers: [
    ],
    imports: [
        CqrsModule
    ],
    exports: [

    ],
})
export class TransportEventBusModule {
    static forRoot(
        publishers: any[],
    ): DynamicModule {

        return {
            module: TransportEventBusModule,
            providers: [
                ...publishers,
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
            ],
        };
    }
}
