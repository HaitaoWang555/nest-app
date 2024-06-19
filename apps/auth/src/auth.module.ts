import { Module } from '@nestjs/common';
import { CommonModule } from '@libs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, GithubStrategy, AuthService],
})
export class AuthModule {}
