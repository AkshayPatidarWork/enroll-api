import {
  Column,
  DataType,
  Table,
  Unique,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Admin } from './admin.model';
import { Student } from './student.model';
import { Course } from './course.model';

@Table({ tableName: 'colleges' })
export class College extends BaseModel {
  @Unique
  @Column(DataType.STRING)
  name: string;

  @Unique
  @Column(DataType.STRING)
  code: string;

  @AllowNull
  @Column(DataType.STRING)
  location: string;

  @HasMany(() => Admin)
  admins: Admin[];

  @HasMany(() => Student)
  students: Student[];

  @HasMany(() => Course)
  courses: Course[];
}
