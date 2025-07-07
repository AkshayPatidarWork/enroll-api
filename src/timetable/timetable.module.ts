import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin, Course, Timetable } from '@enroll/nest/models';

@Module({
  imports: [SequelizeModule.forFeature([Timetable, Course, Admin])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
