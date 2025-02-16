import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRtspDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}