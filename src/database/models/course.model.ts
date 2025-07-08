import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { College } from './college.model';
import { Admin } from './admin.model';
import { Timetable } from './timetable.model';

@Table({
  tableName: 'courses',
  indexes: [
    {
      name: 'college_code_unique',
      unique: true,
      fields: ['collegeId', 'code'],
    },
  ],
})
export class Course extends BaseModel {
  @Column(DataType.STRING)
  code: string;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.INTEGER)
  credits: number;

  @Column(DataType.INTEGER)
  semester: number;

  @ForeignKey(() => College)
  @Column(DataType.UUID)
  collegeId: string;

  @BelongsTo(() => College)
  college: College;

  @ForeignKey(() => Admin)
  @Column(DataType.UUID)
  createdByAdminId: string;

  @BelongsTo(() => Admin, 'createdByAdminId')
  createdByAdmin: Admin;

  @HasOne(() => Timetable)
  timetable: Timetable;
}
