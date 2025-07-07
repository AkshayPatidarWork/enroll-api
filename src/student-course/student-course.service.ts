import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Student, Course, Timetable, StudentCourse } from '@enroll/nest/models';
import { EnrollmentSource } from '../common/types/enrollment-source.enum';

@Injectable()
export class StudentCourseService {
  constructor(
    @InjectModel(Student) private readonly studentModel: typeof Student,
    @InjectModel(Course) private readonly courseModel: typeof Course,
    @InjectModel(Timetable) private readonly timetableModel: typeof Timetable,
    @InjectModel(StudentCourse)
    private readonly selectionModel: typeof StudentCourse,
  ) {}

  async listCoursesByCollege(collegeId: string, semester: number) {
    return this.courseModel.findAll({
      where: {
        collegeId,
        semester,
      },
      include: [Timetable],
    });
  }

  async selectCourses(studentId: string, courseIds: string[]) {
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      throw new BadRequestException('Course list cannot be empty.');
    }

    const student = await this.studentModel.findByPk(studentId);
    if (!student) throw new NotFoundException('Student not found');

    const courses = await this.courseModel.findAll({
      where: { id: courseIds },
    });

    if (courses.length !== courseIds.length) {
      throw new BadRequestException('One or more courses do not exist');
    }

    for (const course of courses) {
      if (course.collegeId !== student.collegeId) {
        throw new ConflictException(
          'Course from a different college not allowed',
        );
      }
      if (course.semester !== student.semester) {
        throw new ConflictException(
          `You can only select courses from semester ${student.semester}`,
        );
      }
    }

    const timetables = await this.timetableModel.findAll({
      where: { courseId: { [Op.in]: courseIds } },
    });

    const dayWise: Record<string, any[]> = {};

    for (const session of timetables) {
      const day = session.day;
      if (!dayWise[day]) {
        dayWise[day] = [];
      }
      dayWise[day].push(session);
    }

    for (const day in dayWise) {
      const sessions = dayWise[day];
      sessions.sort((a, b) => a.startTime.localeCompare(b.startTime));

      for (let i = 0; i < sessions.length - 1; i++) {
        const current = sessions[i];
        const next = sessions[i + 1];

        if (current.endTime > next.startTime) {
          throw new ConflictException(
            `Clash between courses ${current.courseId} and ${next.courseId} on ${day}`,
          );
        }
      }
    }

    const payload = courseIds.map((courseId) => ({
      studentId,
      courseId,
      selectedBy: EnrollmentSource.STUDENT,
    }));

    await this.selectionModel.bulkCreate(payload);

    return {
      message: 'Courses enrolled successfully',
      enrolledCourses: courseIds,
    };
  }

  async getMyCourses(studentId: string) {
    return this.selectionModel.findAll({
      where: { studentId },
      include: [
        {
          model: Course,
          include: [Timetable],
        },
      ],
    });
  }
}
