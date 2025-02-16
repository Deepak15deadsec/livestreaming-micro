import { NestFactory } from '@nestjs/core';
import { RecordingAppModule } from './recording-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RecordingAppModule,{
  transport: Transport.TCP,
      options: {
        port: 3006,
      },
    },);
  await app.listen();
}
bootstrap();
