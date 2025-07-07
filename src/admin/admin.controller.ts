import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { CreateCollegeAdminDto } from './dto/create-college-admin.dto';
import { UserType } from '../common/types/user.enum';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, Roles } from '@enroll/common';

@ApiTags('Admin')
@ApiBearerAuth('token')
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('colleges')
  @Roles(UserType.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create a new college (Super Admin only)' })
  async createCollege(@Body() dto: CreateCollegeDto) {
    return this.adminService.createCollege(dto);
  }

  @Get('colleges')
  @Roles(UserType.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all colleges (Super Admin only)' })
  async getAllColleges() {
    return this.adminService.getAllColleges();
  }

  @Post('admins')
  @Roles(UserType.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create a college admin (Super Admin only)' })
  async createCollegeAdmin(@Body() dto: CreateCollegeAdminDto) {
    return this.adminService.createCollegeAdmin(dto);
  }
}
