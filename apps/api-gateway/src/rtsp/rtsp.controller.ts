import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RtspService } from './rtsp.service';
import { CreateRtspDto } from './dto/create-rtsp.dto';
import { UpdateRtspDto } from './dto/update-rtsp.dto';

@Controller('rtsp')
export class RtspController {
  constructor(private readonly rtspService: RtspService) {}

  @Post()
  create(@Body() createRtspDto: CreateRtspDto) {
    return this.rtspService.create(createRtspDto);
  }

  @Get()
  findAll() {
    return this.rtspService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rtspService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRtspDto: UpdateRtspDto) {
    return this.rtspService.update(+id, updateRtspDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rtspService.remove(+id);
  }
}
