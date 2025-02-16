import { Module } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { RecordingController } from './recording.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
     imports:[
        ClientsModule.register([
          {
            name:'REC_CLIENT',
            transport:Transport.TCP,
            options:{port:3006},
          },
        ]),
      ],
  controllers: [RecordingController],
  providers: [RecordingService],
})
export class RecordingModule {}
