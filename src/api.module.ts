import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtModule } from './common/guards/jwt.module';
import { ConfigModule } from './config/config.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RateLimiterModule } from './common/rate-limiter/rate-limiter.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CollegeModule } from './college/college.module';
import { CourseModule } from './course/course.module';
import { TimetableModule } from './timetable/timetable.module';
import { StudentCourseModule } from './student-course/student-course.module';

@Module({
  imports: [
    ConfigModule,
    RateLimiterModule,
    JwtModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
    StudentModule,
    CollegeModule,
    CourseModule,
    TimetableModule,
    StudentCourseModule,
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
