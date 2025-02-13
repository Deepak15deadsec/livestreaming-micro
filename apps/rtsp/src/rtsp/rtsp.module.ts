import { Module } from '@nestjs/common';
import { RtspService } from './rtsp.service';
import { RtspController } from './rtsp.controller';

@Module({
  controllers: [RtspController],
  providers: [RtspService],
})
export class RtspModule {}
