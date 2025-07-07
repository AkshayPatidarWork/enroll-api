import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollegeDto {
  @ApiProperty({
    description: 'Full name of the college',
    example: 'Maulana Azad National Institute of Technology',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Unique short code for the college',
    example: 'MANIT',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Location of the college',
    example: 'Bhopal, Madhya Pradesh',
  })
  @IsString()
  location: string;
}
