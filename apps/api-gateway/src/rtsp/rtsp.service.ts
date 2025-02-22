import { Inject, Injectable } from '@nestjs/common';
import { CreateRtspDto } from './dto/create-rtsp.dto';
import { UpdateRtspDto } from './dto/update-rtsp.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RtspService {
  constructor(@Inject('RTSP_CLIENT') private rtspClient: ClientProxy) { }

  create(createRtspDto: CreateRtspDto) {
    return this.rtspClient.send('createRtsp', createRtspDto);
  }


  findAll() {
    return this.rtspClient.send('findAllRtsp', {});
  }

  findOne(id: number) {
    return this.rtspClient.send('findOneRtsp', id);
  }

  update(id: number, updateRtspDto: UpdateRtspDto) {
    return `This action updates a #${id} rtsp`;
  }

  remove(id: number) {
    return `This action removes a #${id} rtsp`;
  }
}
