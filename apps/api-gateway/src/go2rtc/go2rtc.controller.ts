import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Go2RtcService } from './go2rtc.service';
import { AddSourceDto } from './dto/add-source.dto';

@Controller('streams')
export class Go2RtcController {
  constructor(private readonly go2rtc: Go2RtcService) {}

  @Get()
  async list() {
    return this.go2rtc.listSources();
  }

  @Post()
  async add(@Body() dto: AddSourceDto) {
    return this.go2rtc.addSource(dto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.go2rtc.removeSource(name);
  }

  @Get('url/:name')
  async getStreamUrl(@Param('name') name: string) {
    return this.go2rtc.getStreamUrl(name);
  }
} 