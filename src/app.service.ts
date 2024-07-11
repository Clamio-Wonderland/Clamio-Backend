import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello world";
    // return "<a href='/auth/google'> Login using google </a>";
  }
}
