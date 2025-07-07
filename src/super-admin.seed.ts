import { UserType } from './common/types/user.enum';
import { toHash } from './common/utils/crypto.utils';

export const createSuperAdminData = async () => {
  return {
    name: 'Admin',
    email: 'superadmin@yopmail.com',
    password: await toHash('Admin@123'),
    role: UserType.SUPER_ADMIN,
    isActive: true,
    collegeId: null,
  };
};
