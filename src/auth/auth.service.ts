import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Student, Admin } from '@enroll/nest/models';
import { LoginDto } from './dto/login.dto';
import { checkHash } from '../common/utils/crypto.utils';
import { UserType } from '../common/types/user.enum';
import { Algorithm } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Student) private studentModel: typeof Student,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.adminModel.findOne({ where: { email } });

    if (admin) {
      const isValid = await checkHash(password, admin.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return this.generateToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        type: 'admin',
        collegeId: admin.collegeId,
      });
    }

    const student = await this.studentModel.findOne({ where: { email } });

    if (student) {
      const isValid = await checkHash(password, student.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return this.generateToken({
        id: student.id,
        email: student.email,
        role: 'STUDENT',
        type: 'student',
        semester: student.semester,
        collegeId: student.collegeId,
      });
    }

    throw new UnauthorizedException('Invalid email or user not found');
  }

  private generateToken(user: {
    id: string;
    email: string;
    role: UserType | 'STUDENT';
    type: 'admin' | 'student';
    collegeId: string;
    semester?: number;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      type: user.type,
      collegeId: user.collegeId,
    };

    if (user.type === 'student' && user.semester !== undefined) {
      payload['semester'] = user.semester;
    }

    const expiresIn = this.configService.get<string>('jwtExpiry') || '3h';
    const issuer = this.configService.get<string>('jwtIssuer') || 'enroll-api';
    const algorithm =
      this.configService.get<Algorithm>('jwtAlgorithm') || 'RS256';

    const token = this.jwtService.sign(payload, {
      algorithm,
      expiresIn,
      issuer,
    });

    return {
      success: true,
      message: 'Login successful',
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        type: user.type,
      },
    };
  }
}
