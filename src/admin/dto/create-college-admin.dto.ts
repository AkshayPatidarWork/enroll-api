import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollegeAdminDto {
  @ApiProperty({
    description: 'Username for the college admin',
    example: 'rahul sharma',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Valid email for login and communication',
    example: 'rahul.sharma@manit.ac.in',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Secure password for admin login (min 6 characters)',
    example: 'Admin@1234',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'UUID of the college this admin belongs to',
    example: 'b4f68c9a-3d59-4e21-b8f2-7f124f5e1d00',
  })
  @IsUUID()
  collegeId: string;
}
