import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RtspService } from './rtsp.service';
import { UpdateRtspDto } from './dto/update-rtsp.dto';
import { CreateRtspDto } from '@app/contracts/rtsp/create-rtsp.dto';

@Controller()
export class RtspController {
  constructor(private readonly rtspService: RtspService) {}

 

  @MessagePattern('createRtsp')
  createRtsp(@Payload() createRtspDto: CreateRtspDto) {
    return this.rtspService.create(createRtspDto);
  }

  @MessagePattern('findAllRtsp')
  findAll() {
    return this.rtspService.findAll();
  }

  

  @MessagePattern('findOneRtsp')
  findOne(@Payload() id: number) {
    console.log("ffffff",id)
    return this.rtspService.findOne(id);
  }

  @MessagePattern('updateRtsp')
  update(@Payload() updateRtspDto: UpdateRtspDto) {
    return this.rtspService.update(updateRtspDto.id, updateRtspDto);
  }

  @MessagePattern('removeRtsp')
  remove(@Payload() id: number) {
    return this.rtspService.remove(id);
  }
}
