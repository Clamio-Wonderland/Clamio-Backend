import { Test, TestingModule } from '@nestjs/testing';
import { MakePaymentController } from './make-payment.controller';
import { MakePaymentService } from './make-payment.service';

describe('MakePaymentController', () => {
  let controller: MakePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakePaymentController],
      providers: [MakePaymentService],
    }).compile();

    controller = module.get<MakePaymentController>(MakePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
