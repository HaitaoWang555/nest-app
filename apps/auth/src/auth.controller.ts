import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('login/github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @Get('callback/github')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req) {
    this.logger.log('req', JSON.stringify(req.user));
    return req.user;
  }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    this.logger.log('req', JSON.stringify(req.user));
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
