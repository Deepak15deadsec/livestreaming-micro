import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, Res } from '@nestjs/common';
import { GstreamerService } from './gstreamer.service';
import { CreateGstreamerDto } from './dto/create-gstreamer.dto';
import { UpdateGstreamerDto } from './dto/update-gstreamer.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';


@Controller('gstreamer')
export class GstreamerController {

  constructor(@Inject('STREAM_CLIENT') private streamClient: ClientProxy,
    @Inject('RTSP_CLIENT') private rtspClient: ClientProxy,) { }

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
  async startStream(@Query('id') id: number) {
    // Fetch the RTSP URL from the RTSP service
    const rtspResponse = await this.rtspClient.send('findOneRtsp', id).toPromise();

    console.log(`Full RTSP Response for ID ${id}:`, rtspResponse);

    // Check if the response contains a valid RTSP URL
    if (!rtspResponse || !rtspResponse.link) {
      throw new Error(`No RTSP URL found for ID ${id}`);
    }

    const rtspUrl = rtspResponse.link; // Extract the RTSP URL

    // Use ID as the stream identifier
    return this.streamClient.send({ cmd: 'start-stream' }, { streamId: id, rtspUrl });
  }

  @Post('stop-stream')
  stopStream(@Query('id') id: number) {
    if (!id) {
      throw new Error(`Stream ID is required to stop streaming`);
    }

    return this.streamClient.send({ cmd: 'stop-stream' }, { streamId: id });
  }


}
