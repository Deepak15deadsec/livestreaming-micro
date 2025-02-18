import { Module } from '@nestjs/common';
import { GstreamerService } from './gstreamer.service';
import { GstreamerController } from './gstreamer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports:[
          ClientsModule.register([
            {
              name:'STREAM_CLIENT',
              transport:Transport.TCP,
              options:{port:5006},
            },
          ]),
        ],
  controllers: [GstreamerController],
  providers: [GstreamerService],
})
export class GstreamerModule {}
