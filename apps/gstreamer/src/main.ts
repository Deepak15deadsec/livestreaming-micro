import { NestFactory } from '@nestjs/core';
import { GstreamerAppModule } from './gstreamer-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(GstreamerAppModule,{
    transport: Transport.TCP,
        options: {
          port: 5006,
        },
      },);
  await app.listen();
}
bootstrap();
