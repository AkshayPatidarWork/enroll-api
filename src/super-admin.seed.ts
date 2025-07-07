export const createSuperAdminData = async () => {
  return {
    name: 'Admin',
    email: 'superadmin@yopmail.com',
    phone: '9999999999',
    password: await toHash('Admin@123'),
    type: UserType.SUPER_ADMIN,
    status: true,
  };
};
