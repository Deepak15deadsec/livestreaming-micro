import { Injectable } from '@nestjs/common';
import { CreateGstreamerDto } from './dto/create-gstreamer.dto';
import { UpdateGstreamerDto } from './dto/update-gstreamer.dto';

@Injectable()
export class GstreamerService {
  create(createGstreamerDto: CreateGstreamerDto) {
    return 'This action adds a new gstreamer';
  }

  findAll() {
    return `This action returns all gstreamer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gstreamer`;
  }

  update(id: number, updateGstreamerDto: UpdateGstreamerDto) {
    return `This action updates a #${id} gstreamer`;
  }

  remove(id: number) {
    return `This action removes a #${id} gstreamer`;
  }
}
