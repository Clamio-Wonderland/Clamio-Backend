import { Test, TestingModule } from '@nestjs/testing';
import { DownloadableController } from './downloadable.controller';
import { DownloadableService } from './downloadable.service';

describe('DownloadableController', () => {
  let controller: DownloadableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadableController],
      providers: [DownloadableService],
    }).compile();

    controller = module.get<DownloadableController>(DownloadableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
