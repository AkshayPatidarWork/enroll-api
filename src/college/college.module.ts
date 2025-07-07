import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { College } from '@enroll/nest/models';

@Module({
  imports: [SequelizeModule.forFeature([College])],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
