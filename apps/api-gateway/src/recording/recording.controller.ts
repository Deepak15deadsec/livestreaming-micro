import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecordingService } from './recording.service';


@Controller('recording')
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}

  @Get('start')
  async startRecording(@Query('id') id: number, @Query('output') output: string) {
    if (!id) {
      return { error: 'Missing required parameter: id' };
    }
    return await this.recordingService.startRecording(id, output || `record_${id}.mp4`);
  }

  @Get('stop')
  async stopRecording(@Query('id') id: number) {
    if (!id) {
      return { error: 'Missing required parameter: id' };
    }
    return await this.recordingService.stopRecording(id);
  }
}
