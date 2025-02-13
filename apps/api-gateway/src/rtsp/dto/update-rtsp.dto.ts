import { PartialType } from '@nestjs/mapped-types';
import { CreateRtspDto } from './create-rtsp.dto';

export class UpdateRtspDto extends PartialType(CreateRtspDto) {}
