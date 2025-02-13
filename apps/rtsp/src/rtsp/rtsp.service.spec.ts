import { Test, TestingModule } from '@nestjs/testing';
import { RtspService } from './rtsp.service';

describe('RtspService', () => {
  let service: RtspService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtspService],
    }).compile();

    service = module.get<RtspService>(RtspService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
