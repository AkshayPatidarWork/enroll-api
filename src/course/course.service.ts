import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course, Timetable } from '@enroll/nest/models';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseModel: typeof Course) {}

  async createCourse(dto: CreateCourseDto, collegeId: string, adminId: string) {
    const existing = await this.courseModel.findOne({
      where: {
        code: dto.code,
        collegeId,
      },
    });

    if (existing) {
      throw new ConflictException(
        'This course code already exists in your college.',
      );
    }

    return this.courseModel.create({
      ...dto,
      collegeId,
      createdByAdminId: adminId,
    });
  }

  async getCoursesByCollege(collegeId: string, semester?: number) {
    const where: any = { collegeId };

    if (semester !== undefined) {
      where.semester = semester;
    }
    return this.courseModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Timetable,
          required: false,
        },
      ],
    });
  }
}
