import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportEventBusModule } from 'nestjs-transport-eventbus';
import { DefaultEventHandler } from './handlers/default.event.handler';
import { RabbitPublisher } from './publishers/rabbit.publisher';

@Module({
    imports: [
        TransportEventBusModule.forRoot({
            publishers: [RabbitPublisher]
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        DefaultEventHandler
    ],
})
export class AppModule {
}
