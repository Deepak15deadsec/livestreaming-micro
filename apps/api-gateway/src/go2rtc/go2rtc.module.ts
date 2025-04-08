import { Module } from '@nestjs/common';
import { Go2RtcService } from './go2rtc.service';
import { Go2RtcController } from './go2rtc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GO2RTC_CLIENT',
        transport: Transport.TCP,
        options: { port: 3007 },
      },
    ]),
  ],
  controllers: [Go2RtcController],
  providers: [Go2RtcService],
})
export class Go2RtcModule {} 