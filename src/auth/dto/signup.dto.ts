import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Akshay Patidar',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email address', example: 'akshay@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password (min 6 characters)',
    example: 'StrongP@ss123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Date of birth (ISO format)',
    example: '1996-07-15',
  })
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'Birthdate must be a valid date string (e.g., 1996-07-15)' },
  )
  birthdate: string;
}
