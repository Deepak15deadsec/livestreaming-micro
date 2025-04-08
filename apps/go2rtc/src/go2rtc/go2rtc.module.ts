import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Go2RtcService } from './go2rtc.service';
import { Go2RtcController } from './go2rtc.controller';

@Module({
  imports: [HttpModule],
  controllers: [Go2RtcController],
  providers: [Go2RtcService],
})
export class Go2RtcModule {} 