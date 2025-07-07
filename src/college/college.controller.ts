import { Controller } from '@nestjs/common';
import { CollegeService } from './college.service';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}
}
