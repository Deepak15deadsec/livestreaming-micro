import { Module } from '@nestjs/common';
import { RtspService } from './rtsp.service';
import { RtspController } from './rtsp.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports:[
      ClientsModule.register([
        {
          name:'RTSP_CLIENT',
          transport:Transport.TCP,
          options:{port:3002},
        },
      ]),
    ],
  controllers: [RtspController],
  providers: [RtspService],
})
export class RtspModule {}
