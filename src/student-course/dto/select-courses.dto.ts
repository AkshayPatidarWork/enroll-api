import { IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelectCoursesDto {
  @ApiProperty({
    description: 'An array of course UUIDs the student wants to select',
    type: [String],
    example: [
      'b42b2c5b-9f57-44fc-936d-5d9426ce0f3e',
      'dd9e0e6b-bb41-4d14-9f8e-17b9fd90d012',
    ],
    minItems: 1,
  })
  @IsArray({ message: 'courseIds must be an array' })
  @ArrayNotEmpty({ message: 'courseIds cannot be empty' })
  @IsUUID('all', { each: true, message: 'Each courseId must be a valid UUID' })
  courseIds!: string[];
}
