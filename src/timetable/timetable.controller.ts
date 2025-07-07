import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { UserType } from '../common/types/user.enum';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, Roles } from '@enroll/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

@ApiTags('Timetable')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @ApiOperation({
    summary: 'Create a timetable slot for a course (College Admin only)',
  })
  createTimetable(@Body() dto: CreateTimetableDto, @Req() req) {
    return this.timetableService.createTimetable(dto, req.user.sub);
  }

  @Put(':id')
  @Roles(UserType.ADMIN)
  @ApiOperation({
    summary: 'Update a course timetable slot (College Admin only)',
  })
  updateTimetable(
    @Param('id') id: string,
    @Body() dto: UpdateTimetableDto,
    @Req() req,
  ) {
    return this.timetableService.updateTimetable(id, dto, req.user.sub);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @ApiOperation({
    summary: 'Delete a course timetable slot (College Admin only)',
  })
  deleteTimetable(@Param('id') id: string, @Req() req) {
    return this.timetableService.deleteTimetable(id, req.user.sub);
  }
}
