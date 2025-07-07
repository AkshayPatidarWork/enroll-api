import {
  Column,
  DataType,
  Table,
  Unique,
  ForeignKey,
  BelongsTo,
  AllowNull,
  Default,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { College } from './college.model';

@Table({ tableName: 'admins' })
export class Admin extends BaseModel {
  @Unique
  @Column(DataType.STRING)
  username: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  passwordHash: string;

  @Column({
    type: DataType.ENUM('superadmin', 'college-admin'),
    allowNull: false,
  })
  role: 'superadmin' | 'college-admin';

  @ForeignKey(() => College)
  @AllowNull
  @Column(DataType.UUID)
  collegeId: string;

  @BelongsTo(() => College)
  college: College;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;
}
