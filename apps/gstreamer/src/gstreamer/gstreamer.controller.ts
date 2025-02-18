import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GstreamerService } from './gstreamer.service';
import { CreateGstreamerDto } from './dto/create-gstreamer.dto';
import { UpdateGstreamerDto } from './dto/update-gstreamer.dto';

@Controller()
export class GstreamerController {

  constructor(private readonly gstreamerService: GstreamerService) { }

  @MessagePattern('start_recording')
  startRecording(data: { outputFile: string }) {
    const success = this.gstreamerService.startRecording(data.outputFile);
    return { message: success ? 'Recording started' : 'Recording already in progress' };
  }

  @MessagePattern('stop_recording')
  stopRecording() {
    const success = this.gstreamerService.stopRecording();
    return { message: success ? 'Recording stopped' : 'No recording in progress' };
  }
}


