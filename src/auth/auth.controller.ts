import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async handleSignup(@Body() signup: SignupDto) {
    return this.authService.signup(signup);
  }

  @Public()
  @Post('login')
  async handleLogin(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
