import { Module } from '@nestjs/common';
import { Go2RtcModule } from './go2rtc/go2rtc.module';

@Module({
  imports: [Go2RtcModule],
  controllers: [],
  providers: [],
})
export class Go2RtcAppModule {} 