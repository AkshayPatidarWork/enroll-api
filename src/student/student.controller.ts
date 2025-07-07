import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

import { JwtAuthGuard, Roles } from '@enroll/common';
import { UserType } from '../common/types/user.enum';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Students')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Create a new student (College Admin only)' })
  async createStudent(@Body() dto: CreateStudentDto, @Req() req) {
    const user = req.user;

    if (!user.collegeId) {
      throw new BadRequestException('Your account is not linked to a college.');
    }

    return this.studentService.createStudent(dto, user.collegeId, user.sub);
  }

  @Get()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'List all students in the admin’s college' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listStudents(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.studentService.getStudentsByCollege(
      req.user.collegeId,
      Number(page),
      Number(limit),
    );
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Update a student record (College Admin only)' })
  async updateStudent(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto,
    @Req() req,
  ) {
    return this.studentService.updateStudent(id, dto, req.user.collegeId);
  }
}
