import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Go2RtcService } from './go2rtc.service';
import { MessagePattern } from '@nestjs/microservices';
import { AddSourceDto } from './dto/add-source.dto';

@Controller()
export class Go2RtcController {
  constructor(private readonly go2rtc: Go2RtcService) {}

  @MessagePattern({ cmd: 'list-sources' })
  async listSources() {
    return this.go2rtc.listSources();
  }

  @MessagePattern({ cmd: 'add-source' })
  async addSource(dto: AddSourceDto) {
    return this.go2rtc.addSource(dto);
  }

  @MessagePattern({ cmd: 'remove-source' })
  async removeSource(name: string) {
    return this.go2rtc.removeSource(name);
  }

  @MessagePattern({ cmd: 'get-stream-url' })
  async getStreamUrl(name: string) {
    return this.go2rtc.getStreamUrl(name);
  }
} 