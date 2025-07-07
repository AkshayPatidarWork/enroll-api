import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
// import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtModule } from './common/guards/jwt.module';
import { ConfigModule } from './config/config.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RateLimiterModule } from './common/rate-limiter/rate-limiter.module';

@Module({
  imports: [
    ConfigModule,
    RateLimiterModule,
    JwtModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ApiModule {}
