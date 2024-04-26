import { Timing } from '@libs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  @Timing()
  getHello(): string {
    return 'Hello World!';
  }
}
