import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: 'http://localhost:3009/callback/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    return profile;
  }
}
