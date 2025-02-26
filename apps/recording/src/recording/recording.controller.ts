import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RecordingService } from './recording.service';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';

@Controller()
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}

  @MessagePattern({ cmd: 'start-recording' })
  startRecording(data: { id: number; rtspUrl: string; output: string }) {
    return this.recordingService.startRecording(data.id, data.rtspUrl, data.output);
  }

  @MessagePattern({ cmd: 'stop-recording' })
  stopRecording(data: { id: number }) {
    return this.recordingService.stopRecording(data.id);
  }
}