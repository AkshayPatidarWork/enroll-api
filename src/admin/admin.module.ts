import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SuperAdminService } from './super-admin.service';

import { Admin, College, Student, Course } from '@enroll/nest/models';
import { StudentService } from '../student/student.service';
import { CourseService } from '../course/course.service';

@Module({
  imports: [SequelizeModule.forFeature([Admin, College, Student, Course])],
  controllers: [AdminController],
  providers: [AdminService, SuperAdminService, StudentService, CourseService],
})
export class AdminModule {}
