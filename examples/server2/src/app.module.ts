import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitEventHandler } from './handlers/rabbit.event.handler';
import { TransportEventBusModule } from 'nestjs-transport-eventbus';

@Module({
  imports: [
      TransportEventBusModule
  ],
  controllers: [AppService],
  providers: [AppService, RabbitEventHandler],
})
export class AppModule {}
