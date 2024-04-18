import { Controller, Get, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    this.logger.log('Calling getHello()', AdminController.name);
    this.logger.debug('Calling getHello()', AdminController.name);

    try {
      throw new Error();
    } catch (e) {
      this.logger.error('Calling getHello()', e.stack, AdminController.name);
    }

    return this.adminService.getHello();
  }
}
