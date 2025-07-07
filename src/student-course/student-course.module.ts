import { Module } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { StudentCourseController } from './student-course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student, StudentCourse, Course, Timetable } from '@enroll/nest/models';
@Module({
  imports: [
    SequelizeModule.forFeature([Student, Course, Timetable, StudentCourse]),
  ],
  controllers: [StudentCourseController],
  providers: [StudentCourseService],
})
export class StudentCourseModule {}
