import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RecordingService {

  constructor(@Inject('REC_CLIENT') private recClient: ClientProxy) { }



  startRecording(output: string) {
    return this.recClient.send({ cmd: 'start-recording' }, { output }).toPromise();
  }

  stopRecording() {
    return this.recClient.send({ cmd: 'stop-recording' }, {}).toPromise();
  }

  f
}
