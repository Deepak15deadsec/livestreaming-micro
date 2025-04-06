import { Module } from '@nestjs/common';
import { GstreamerService } from './gstreamer.service';
import { GstreamerController } from './gstreamer.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GstreamerController],
  providers: [GstreamerService],
})
export class GstreamerModule {}
