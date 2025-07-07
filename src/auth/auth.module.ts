import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '../common/guards/jwt.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin, Student } from '@enroll/nest/models';
@Module({
  imports: [
    ConfigModule,
    JwtModule,
    SequelizeModule.forFeature([Admin, Student]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
