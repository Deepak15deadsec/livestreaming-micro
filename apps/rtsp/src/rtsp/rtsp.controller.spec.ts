import { Test, TestingModule } from '@nestjs/testing';
import { RtspController } from './rtsp.controller';
import { RtspService } from './rtsp.service';

describe('RtspController', () => {
  let controller: RtspController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtspController],
      providers: [RtspService],
    }).compile();

    controller = module.get<RtspController>(RtspController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
