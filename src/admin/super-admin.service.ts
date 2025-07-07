import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '@enroll/nest/models';
import { createSuperAdminData } from '../super-admin.seed';
import { UserType } from '../common/types/user.enum';

@Injectable()
export class SuperAdminService implements OnModuleInit {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async onModuleInit() {
    await this.ensureSuperAdmin();
  }

  private async ensureSuperAdmin() {
    const exists = await this.adminModel.findOne({
      where: { role: UserType.SUPER_ADMIN },
    });
    if (!exists) {
      const data = await createSuperAdminData();
      await this.adminModel.create(data);
      console.log(' SuperAdmin created');
    } else {
      console.log('SuperAdmin already exists');
    }
  }
}
