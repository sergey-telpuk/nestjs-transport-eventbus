import 'reflect-metadata';
import { TransportEventBusType } from '../types/transport.event-bus.type';
import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { TRANSPORT_EVENT_BUS_PATTERN } from '../constants/transport.event-bus.constants';
import { ClientProxy } from '@nestjs/microservices';
import { ITransportPublisherEventBus } from '../interfaces/transport.publisher.event-bus.interface';
import { ITransportDataEventBus } from '../interfaces/transport.data.event-bus.interface';
import { Logger, LoggerService } from '@nestjs/common/services/logger.service';

export function Publisher(TYPE: TransportEventBusType) {
    return <T extends new(...args: any[]) => {}>(constructor: T) => {
        return class extends constructor implements IEventPublisher, ITransportPublisherEventBus {
            readonly TRANSPORT: TransportEventBusType = TYPE;
            readonly client: ClientProxy;
            readonly logger: LoggerService;

            public async publish<TPub extends IEvent>(event: TPub): Promise<void> {
                const data: ITransportDataEventBus = {
                    payload: event,
                    eventName: event['EVENT_NAME'],// tslint:disable-line
                };

                delete event['EVENT_NAME'];// tslint:disable-line

                this.send(data);
            }

            public async send(data: ITransportDataEventBus) {
                try {
                    await this.client.send(TRANSPORT_EVENT_BUS_PATTERN, data).toPromise();
                } catch (err) {
                    if (!this.logger) {
                        (new Logger(ClientProxy.name)).error(err);
                        return;
                    }
                    this.logger.error(err);
                }
            }
        };
    };
}
