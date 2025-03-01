import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecordingService {

  constructor(
    @Inject('REC_CLIENT') private recClient: ClientProxy,
    @Inject('RTSP_CLIENT') private rtspClient: ClientProxy, // Inject RTSP microservice
  ) { }


  async startRecording(id: number, output: string) {
    try {
      // Fetch RTSP URL from the RTSP microservice
      console.log(id)
      const rtspResponse = await this.rtspClient.send('findOneRtsp', id).toPromise();

      console.log(`Full RTSP Response for ID ${id}:`, rtspResponse);

      if (!rtspResponse || !rtspResponse.link) {
        throw new Error(`No RTSP URL found for ID ${id}`);
      }

      const rtspUrl = rtspResponse.link; // Extract the path
      console.log(`RTSP URL for ID ${id}: ${rtspUrl}`);
      // Start recording using the retrieved RTSP URL
      return this.recClient.send({ cmd: 'start-recording' }, {id, rtspUrl, output });
    } catch (error) {
      console.error(`Error starting recording: ${error.message}`);
      throw error;
    }
  }

  stopRecording(id: number) {
    return this.recClient.send({ cmd: 'stop-recording' }, { id }).toPromise();
  }


}
