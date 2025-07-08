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
import { StudentStatus } from '../../common/types/student-status.enum';

@Table({
  tableName: 'students',
  indexes: [{ name: 'idx_student_collegeId', fields: ['collegeId'] }],
})
export class Student extends BaseModel {
  @Column(DataType.STRING)
  name: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Unique
  @Column(DataType.STRING)
  enrollmentNumber: string;

  @ForeignKey(() => College)
  @Column(DataType.UUID)
  collegeId: string;

  @BelongsTo(() => College)
  college: College;

  @Column(DataType.INTEGER)
  semester: number;

  @ForeignKey(() => Admin)
  @Column(DataType.UUID)
  createdByAdminId: string;

  @BelongsTo(() => Admin, 'createdByAdminId')
  createdByAdmin: Admin;

  @Column({
    type: DataType.ENUM({ values: Object.values(StudentStatus) }),
    defaultValue: StudentStatus.ACTIVE,
  })
  status: StudentStatus;
}
