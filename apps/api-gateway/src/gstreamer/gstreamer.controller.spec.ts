import { Test, TestingModule } from '@nestjs/testing';
import { GstreamerController } from './gstreamer.controller';
import { GstreamerService } from './gstreamer.service';

describe('GstreamerController', () => {
  let controller: GstreamerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GstreamerController],
      providers: [GstreamerService],
    }).compile();

    controller = module.get<GstreamerController>(GstreamerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
