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
import { UserType } from '../../common/types/user.enum';

@Table({ tableName: 'admins' })
export class Admin extends BaseModel {
  @Unique
  @Column(DataType.STRING)
  name: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(UserType) }),
    allowNull: false,
  })
  role: UserType;

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
