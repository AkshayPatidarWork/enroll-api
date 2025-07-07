import {
  IsEmail,
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentStatus } from '../../common/types/student-status.enum';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MANIT2024001' })
  @IsString()
  enrollmentNumber: string;

  @ApiProperty({ example: 'Student@123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 8 })
  @IsInt()
  @Min(1)
  @Max(8)
  semester: number;

  @ApiPropertyOptional({ enum: StudentStatus, default: StudentStatus.ACTIVE })
  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;
}
