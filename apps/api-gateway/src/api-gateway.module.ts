import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { RtspModule } from './rtsp/rtsp.module';
import { RecordingModule } from './recording/recording.module';
import { GstreamerModule } from './gstreamer/gstreamer.module';

@Module({
  imports: [RtspModule, RecordingModule, GstreamerModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
