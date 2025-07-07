import {
  Column,
  DataType,
  Table,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { College } from './college.model';
import { Admin } from './admin.model';

@Table({ tableName: 'students' })
export class Student extends BaseModel {
  @Column(DataType.STRING)
  name: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Unique
  @Column(DataType.STRING)
  enrollmentNumber: string;

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

  @Column({
    type: DataType.ENUM('active', 'inactive', 'graduated'),
    defaultValue: 'active',
  })
  status: 'active' | 'inactive' | 'graduated';
}
