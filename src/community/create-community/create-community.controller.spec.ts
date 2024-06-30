import { Test, TestingModule } from '@nestjs/testing';
import { CreateCommunityController } from './create-community.controller';

describe('CreateCommunityController', () => {
  let controller: CreateCommunityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCommunityController],
    }).compile();

    controller = module.get<CreateCommunityController>(CreateCommunityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
