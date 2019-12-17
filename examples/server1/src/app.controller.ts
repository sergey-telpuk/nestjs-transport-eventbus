import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/default')
  handleDefaultEvent() {
    this.appService.handleDefaultEvent();
  }

  @Get('/rabbit')
  rabbit() {
    this.appService.rabbitEvent();
  }
}
