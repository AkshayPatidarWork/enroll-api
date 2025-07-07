// src/common/modules/jwt.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JwtRootModule, JwtSecretRequestType } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { existsSync } from 'fs';

@Global()
@Module({
  imports: [
    JwtRootModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const privateKeyPath = config.get<string>('jwtPrivateKey');
        const publicKeyPath = config.get<string>('jwtPublicKey');

        if (!privateKeyPath || !existsSync(privateKeyPath)) {
          throw new Error(
            `JWT private key file not found at: ${privateKeyPath}`,
          );
        }
        if (!publicKeyPath || !existsSync(publicKeyPath)) {
          throw new Error(`JWT public key file not found at: ${publicKeyPath}`);
        }

        return {
          secretOrKeyProvider(type: JwtSecretRequestType) {
            switch (type) {
              case JwtSecretRequestType.SIGN:
                return readFileSync(privateKeyPath, 'utf8');
              case JwtSecretRequestType.VERIFY:
                return readFileSync(publicKeyPath, 'utf8');
              default:
                throw new Error(`Unknown JwtSecretRequestType: ${type}`);
            }
          },
          signOptions: {
            algorithm: config.get<'RS256'>('jwtAlgorithm') || 'RS256',
            expiresIn: config.get<string>('jwtExpiry') || '1d',
            issuer: config.get<string>('jwtIssuer') || 'horoscope-api',
          },
        };
      },
    }),
  ],
  exports: [JwtRootModule],
})
export class JwtModule {}
