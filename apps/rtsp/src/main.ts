import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RtspAppModule } from './rtsp-app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RtspAppModule, {
    transport: Transport.TCP,
    options: {
      port: 3005,
    },
  },);
  await app.listen();
}
bootstrap();
