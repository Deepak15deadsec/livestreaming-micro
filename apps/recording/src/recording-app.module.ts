import { Module } from '@nestjs/common';
import { RecordingModule } from './recording/recording.module';


@Module({
  imports: [RecordingModule],
  controllers: [],
  providers: [],
})
export class RecordingAppModule {}
