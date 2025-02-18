import { PartialType } from '@nestjs/mapped-types';
import { CreateGstreamerDto } from './create-gstreamer.dto';

export class UpdateGstreamerDto extends PartialType(CreateGstreamerDto) {
  id: number;
}
