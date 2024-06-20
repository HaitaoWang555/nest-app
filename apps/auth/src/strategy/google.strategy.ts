import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { HttpsProxyAgent } from 'https-proxy-agent';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: 'http://localhost:3009/callback/google',
      scope: ['email', 'profile'],
    });
    if (process.env['HTTPS_PROXY']) {
      const httpsProxyAgent = new HttpsProxyAgent(process.env['HTTPS_PROXY']);
      this._oauth2.setAgent(httpsProxyAgent);
    }
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
