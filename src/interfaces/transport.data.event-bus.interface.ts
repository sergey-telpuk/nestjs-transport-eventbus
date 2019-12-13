import { IEvent } from '@nestjs/cqrs';

export interface ITransportDataEventBus {
    payload: IEvent;
    eventName: string;
}
