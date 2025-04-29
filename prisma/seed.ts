import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import prisma from '../src/app/utils/prisma.ts';
import config from '../src/app/config/index.ts';

const AdminEmail = config.admin_email;
const AdminPassword = config.admin_password;

const SeedAdmin = async function () {
  try {
    const isAdminExists = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
    });

    if (isAdminExists) {
      console.log('Admin user already exists.');
      return;
    }

    const hashPassword = await bcrypt.hash(AdminPassword as string, 12);

    await prisma.user.create({
      data: {
        email: AdminEmail as string,
        password: hashPassword,
        role: Role.ADMIN,
      },
    });

    console.log('Admin Created Successfully!', {
      email: AdminEmail,
      password: AdminPassword,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

SeedAdmin();
