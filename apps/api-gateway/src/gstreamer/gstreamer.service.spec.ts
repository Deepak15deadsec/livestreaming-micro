import { Test, TestingModule } from '@nestjs/testing';
import { GstreamerService } from './gstreamer.service';

describe('GstreamerService', () => {
  let service: GstreamerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GstreamerService],
    }).compile();

    service = module.get<GstreamerService>(GstreamerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
