import { Module } from '@nestjs/common';
import { GstreamerService } from './gstreamer.service';
import { GstreamerController } from './gstreamer.controller';

@Module({
  controllers: [GstreamerController],
  providers: [GstreamerService],
})
export class GstreamerModule {}
