import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { GstreamerService } from './gstreamer.service';
import { CreateGstreamerDto } from './dto/create-gstreamer.dto';
import { UpdateGstreamerDto } from './dto/update-gstreamer.dto';
import { ClientProxy } from '@nestjs/microservices';


@Controller('gstreamer')
export class GstreamerController {
  
  constructor(@Inject('STREAM_CLIENT') private streamClient: ClientProxy) { }

  @Post('start')
  async startRecording(@Body('outputFile') outputFile: string) {
    const response = await this.streamClient.send('start_recording', { outputFile }).toPromise();
    return response;
  }

  @Post('stop')
  async stopRecording() {
    const response = await this.streamClient.send('stop_recording', {}).toPromise();
    return response;
  }

 
  @Post('start-stream')
  startStream(@Body('rtspUrl') rtspUrl: string) {
    return this.streamClient.send({ cmd: 'start-stream' }, rtspUrl);
  }

  @Post('stop-stream')
  stopStream() {
    return this.streamClient.send({ cmd: 'stop-stream' }, {});
  }
}
