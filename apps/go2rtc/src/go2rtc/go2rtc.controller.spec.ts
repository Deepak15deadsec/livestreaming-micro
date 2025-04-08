import { Test, TestingModule } from '@nestjs/testing';
import { Go2RtcController } from './go2rtc.controller';
import { Go2RtcService } from './go2rtc.service';
import { HttpModule } from '@nestjs/axios';

describe('Go2RtcController', () => {
  let controller: Go2RtcController;
  let service: Go2RtcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [Go2RtcController],
      providers: [Go2RtcService],
    }).compile();

    controller = module.get<Go2RtcController>(Go2RtcController);
    service = module.get<Go2RtcService>(Go2RtcService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
}); 