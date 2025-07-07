import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { College, Admin } from '@enroll/nest/models';
import { CreateCollegeDto } from './dto/create-college.dto';
import { CreateCollegeAdminDto } from './dto/create-college-admin.dto';
import { toHash } from '../common/utils/crypto.utils';
import { UserType } from '../common/types/user.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(College) private collegeModel: typeof College,
    @InjectModel(Admin) private adminModel: typeof Admin,
  ) {}

  async createCollege(dto: CreateCollegeDto): Promise<College> {
    const existing = await this.collegeModel.findOne({
      where: { code: dto.code },
    });

    if (existing) {
      throw new ConflictException('A college with this code already exists.');
    }

    return this.collegeModel.create({
      name: dto.name,
      code: dto.code,
      location: dto.location,
    });
  }

  async getAllColleges(): Promise<College[]> {
    return this.collegeModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async createCollegeAdmin(dto: CreateCollegeAdminDto): Promise<Admin> {
    const existing = await this.adminModel.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('An admin with this email already exists.');
    }
    const college = await this.collegeModel.findByPk(dto.collegeId);
    if (!college) {
      throw new BadRequestException(
        `College with ID '${dto.collegeId}' does not exist.`,
      );
    }

    const passwordHash = await toHash(dto.password);
    const admin = await this.adminModel.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
      collegeId: dto.collegeId,
      role: UserType.ADMIN,
    });

    const result = admin.get({ plain: true });
    delete result.password;

    return result;
  }
}
