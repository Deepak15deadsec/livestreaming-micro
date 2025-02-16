import { NestFactory } from '@nestjs/core';
import { RecordingModule } from './recording.module';

async function bootstrap() {
  const app = await NestFactory.create(RecordingModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
