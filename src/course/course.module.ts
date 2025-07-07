import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, Timetable } from '@enroll/nest/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Course, Timetable])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
