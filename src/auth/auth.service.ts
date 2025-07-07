import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { checkHash, toHash } from '../common/utils/crypto.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password, birthdate } = signupDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already registered.');
    }

    const hashedPassword = await toHash(password);

    const newUser = await this.userService.create({
      name,
      email,
      password: hashedPassword,
      birthdate: new Date(birthdate),
    });

    return {
      message: 'Signup successful',
      userId: newUser.id,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await checkHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      zodiacSign: user.zodiacSign,
    };

    const expiresIn = this.configService.get<string>('jwtExpiry') || '3h';
    const issuer =
      this.configService.get<string>('jwtIssuer') || 'horoscope-api';

    const accessToken = this.jwtService.sign(payload, {
      expiresIn,
      issuer,
    });

    return {
      success: true,
      message: 'Login successful',
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        zodiacSign: user.zodiacSign,
      },
    };
  }
}
