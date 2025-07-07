import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, Roles } from '@enroll/common';
import { StudentCourseService } from './student-course.service';
import { SelectCoursesDto } from './dto/select-courses.dto';
@ApiTags('Student Courses')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Get('available-courses')
  @Roles('STUDENT')
  async listAvailableCourses(@Req() req) {
    const user = req.user;

    if (!user.collegeId || user.semester == null) {
      throw new BadRequestException(
        'Student data incomplete (college or semester missing)',
      );
    }

    return this.studentCourseService.listCoursesByCollege(
      user.collegeId,
      user.semester,
    );
  }

  @Post('courses')
  @Roles('STUDENT')
  async selectCourses(@Body() dto: SelectCoursesDto, @Req() req) {
    return this.studentCourseService.selectCourses(req.user.sub, dto.courseIds);
  }

  @Get('courses')
  @Roles('STUDENT')
  async myCourses(@Req() req) {
    return this.studentCourseService.getMyCourses(req.user.sub);
  }
}
