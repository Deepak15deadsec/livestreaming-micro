import { Module } from '@nestjs/common';
import { RtspModule } from './rtsp/rtsp.module';


@Module({
  imports: [RtspModule],
  controllers: [],
  providers: [],
})
export class RtspAppModule {}
