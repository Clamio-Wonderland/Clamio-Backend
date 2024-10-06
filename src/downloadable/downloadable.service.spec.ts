import { Test, TestingModule } from '@nestjs/testing';
import { DownloadableService } from './downloadable.service';

describe('DownloadableService', () => {
  let service: DownloadableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadableService],
    }).compile();

    service = module.get<DownloadableService>(DownloadableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
