import { NestFactory } from '@nestjs/core';
import { Go2RtcAppModule } from './go2rtc-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Go2RtcAppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3007,
      },
    },
  );
  await app.listen();
}
bootstrap(); 