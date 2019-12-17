import { Inject, Injectable } from '@nestjs/common';
import { TRANSPORT_EVENT_BUS_SERVICE } from 'nestjs-transport-eventbus';
import { IEventBus } from '@nestjs/cqrs';
import { DefaultEvent } from './events/default.event';
import { RabbitEvent } from './events/rabbit.event';

@Injectable()
export class AppService {
  constructor(
      @Inject(TRANSPORT_EVENT_BUS_SERVICE) private readonly eventBus: IEventBus
  ){

  }
  handleDefaultEvent(): void {
    this.eventBus.publish(new DefaultEvent('Pass some param'));
  }
  rabbitEvent(): void {
    this.eventBus.publish(new RabbitEvent('Pass some param'));
  }
}
