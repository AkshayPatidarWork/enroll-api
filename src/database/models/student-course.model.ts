import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Model,
} from 'sequelize-typescript';
import { Student } from './student.model';
import { Course } from './course.model';
import { Admin } from './admin.model';

@Table({ tableName: 'studentCourses', timestamps: false })
export class StudentCourse extends Model {
  @PrimaryKey
  @ForeignKey(() => Student)
  @Column(DataType.UUID)
  studentId: string;

  @PrimaryKey
  @ForeignKey(() => Course)
  @Column(DataType.UUID)
  courseId: string;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    type: DataType.ENUM('student', 'admin'),
    defaultValue: 'student',
  })
  selectedBy: 'student' | 'admin';

  @ForeignKey(() => Admin)
  @Column(DataType.UUID)
  selectedByAdminId: string;

  @BelongsTo(() => Admin, 'selectedByAdminId')
  selectedByAdmin: Admin;

  @Column(DataType.STRING)
  sourceIp: string;

  @Column(DataType.TEXT)
  remarks: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt: Date;
}
