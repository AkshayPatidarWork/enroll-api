import { IsEnum, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '../../common/types/days-of-week.enum';

export class CreateTimetableDto {
  @ApiProperty({ example: 'b4f68c9a-1234-4e21-b8f2-7f12abcd0001' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ enum: DayOfWeek, example: 'MONDAY' })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({ example: '09:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  endTime: string;

  @ApiProperty({ example: 'Room 101', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'Initial setup', required: false })
  @IsOptional()
  @IsString()
  changeReason?: string;
}
