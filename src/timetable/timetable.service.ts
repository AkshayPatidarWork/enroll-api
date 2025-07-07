import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Timetable, Course, Admin } from '@enroll/nest/models';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { CreateTimetableDto } from './dto/create-timetable.dto';

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(Timetable) private timetableModel: typeof Timetable,
    @InjectModel(Course) private courseModel: typeof Course,
    @InjectModel(Admin) private adminModel: typeof Admin,
  ) {}

  async createTimetable(dto: CreateTimetableDto, adminId: string) {
    const course = await this.courseModel.findByPk(dto.courseId);
    if (!course) throw new BadRequestException('Course not found');

    const admin = await this.adminModel.findByPk(adminId);
    if (!admin || admin.collegeId !== course.collegeId) {
      throw new ForbiddenException(
        'You can only add timetable for your own college courses.',
      );
    }

    const overlapping = await this.timetableModel.findOne({
      where: {
        courseId: dto.courseId,
        day: dto.day,
        startTime: { [Op.lt]: dto.endTime },
        endTime: { [Op.gt]: dto.startTime },
      },
    });

    if (overlapping) {
      throw new ConflictException(
        'This course already has an overlapping session.',
      );
    }

    return this.timetableModel.create({
      ...dto,
      modifiedByAdminId: adminId,
    });
  }

  //TODO: Prevent timetable updates that would cause clashes for already enrolled students.
  async updateTimetable(id: string, dto: UpdateTimetableDto, adminId: string) {
    const timetable = await this.timetableModel.findByPk(id, {
      include: [Course],
    });

    if (!timetable) throw new NotFoundException('Timetable not found');

    const admin = await this.adminModel.findByPk(adminId);
    if (!admin || admin.collegeId !== timetable.course.collegeId) {
      throw new ForbiddenException(
        'You cannot edit timetables of another college.',
      );
    }

    return timetable.update({
      ...dto,
      modifiedByAdminId: adminId,
    });
  }

  async deleteTimetable(id: string, adminId: string) {
    const timetable = await this.timetableModel.findByPk(id, {
      include: [Course],
    });

    if (!timetable) throw new NotFoundException('Timetable not found');

    const admin = await this.adminModel.findByPk(adminId);
    if (!admin || admin.collegeId !== timetable.course.collegeId) {
      throw new ForbiddenException(
        'You cannot delete timetables from another college.',
      );
    }

    await timetable.destroy();
    return { message: 'Timetable deleted successfully' };
  }
}
