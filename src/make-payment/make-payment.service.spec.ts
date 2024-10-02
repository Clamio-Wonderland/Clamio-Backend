import { Test, TestingModule } from '@nestjs/testing';
import { MakePaymentService } from './make-payment.service';

describe('MakePaymentService', () => {
  let service: MakePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakePaymentService],
    }).compile();

    service = module.get<MakePaymentService>(MakePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
