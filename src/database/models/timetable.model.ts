import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Course } from './course.model';
import { Admin } from './admin.model';
import { DayOfWeek } from '../../common/types/days-of-week.enum';

@Table({ tableName: 'timetables' })
export class Timetable extends BaseModel {
  @ForeignKey(() => Course)
  @Column(DataType.UUID)
  courseId: string;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    type: DataType.ENUM({ values: Object.values(DayOfWeek) }),
  })
  day: DayOfWeek;

  @Column(DataType.TIME)
  startTime: string;

  @Column(DataType.TIME)
  endTime: string;

  @AllowNull
  @Column(DataType.STRING)
  location: string;

  @ForeignKey(() => Admin)
  @AllowNull
  @Column(DataType.UUID)
  modifiedByAdminId: string;

  @BelongsTo(() => Admin, 'modifiedByAdminId')
  modifiedByAdmin: Admin;

  @AllowNull
  @Column(DataType.TEXT)
  changeReason: string;
}
