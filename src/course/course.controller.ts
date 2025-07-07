import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

import { UserType } from '../common/types/user.enum';
import { JwtAuthGuard, Roles } from '@enroll/common';
import { CourseService } from '../course/course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('Courses')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Create a new course (College Admin only)' })
  async createCourse(@Body() dto: CreateCourseDto, @Req() req) {
    const user = req.user;

    if (!user.collegeId) {
      throw new BadRequestException(
        'Your admin account is not linked to a college.',
      );
    }

    return this.courseService.createCourse(dto, user.collegeId, user.sub);
  }

  @Get()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'List all courses in the admin’s college' })
  @ApiQuery({ name: 'semester', required: false, type: Number, example: 3 })
  async listCourses(@Req() req, @Query('semester') semester?: number) {
    return this.courseService.getCoursesByCollege(
      req.user.collegeId,
      semester ? Number(semester) : undefined,
    );
  }
}
