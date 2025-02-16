import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecordingService } from './recording.service';


@Controller('recording')
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}

  @Get('start')
  async startRecording(@Query('output') output: string) {
    return await this.recordingService.startRecording(output || 'output.mp4');
  }

  @Get('stop')
  async stopRecording() {
    return await this.recordingService.stopRecording();
  }
}
