import { Test, TestingModule } from '@nestjs/testing';
import { Go2RtcService } from './go2rtc.service';
import { HttpModule } from '@nestjs/axios';

describe('Go2RtcService', () => {
  let service: Go2RtcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [Go2RtcService],
    }).compile();

    service = module.get<Go2RtcService>(Go2RtcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 