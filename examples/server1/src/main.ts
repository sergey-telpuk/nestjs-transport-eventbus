import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001, '0.0.0.0', () => {
        console.info(`Running server1: port: ${3001}`);
    });
}

bootstrap();
