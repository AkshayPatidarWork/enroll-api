import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from '@enroll/nest/models';
import { toHash } from '../common/utils/crypto.utils';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student) private studentModel: typeof Student) {}

  async createStudent(
    dto: CreateStudentDto,
    collegeId: string,
    adminId: string,
  ) {
    const exists = await this.studentModel.findOne({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Student already exists with this email');
    }

    const hashedPassword = await toHash(dto.password);
    const student = await this.studentModel.create({
      ...dto,
      collegeId,
      createdByAdminId: adminId,
      password: hashedPassword,
      status: dto.status || 'ACTIVE',
    });

    const plainStudent = student.get({ plain: true });
    delete plainStudent.password;

    return plainStudent;
  }

  async getStudentsByCollege(collegeId: string, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { rows, count } = await this.studentModel.findAndCountAll({
      where: { collegeId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      page,
      pageSize: limit,
      totalPages: Math.ceil(count / limit),
    };
  }
  async updateStudent(id: string, dto: UpdateStudentDto, collegeId: string) {
    const student = await this.studentModel.findByPk(id);

    if (!student || student.collegeId !== collegeId) {
      throw new NotFoundException('Student not found or not in your college');
    }

    if (dto.password) {
      dto.password = await toHash(dto.password);
    }

    await student.update(dto);
    return { message: 'Student updated successfully' };
  }
}
