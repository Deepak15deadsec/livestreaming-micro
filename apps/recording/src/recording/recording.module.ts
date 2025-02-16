import { Module } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { RecordingController } from './recording.controller';

@Module({
  controllers: [RecordingController],
  providers: [RecordingService],
})
export class RecordingModule {}
