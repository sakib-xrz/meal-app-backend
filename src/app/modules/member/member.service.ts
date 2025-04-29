import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { IMember } from './member.interface';

const CreateMember = async (payload: IMember) => {
  const isMemberExist = await prisma.member.findFirst({
    where: {
      phone: payload.phone,
    },
  });

  if (isMemberExist) {
    throw new AppError(httpStatus.CONFLICT, 'Member already exists');
  }

  const result = await prisma.member.create({
    data: payload,
  });

  return result;
};

const GetAllMembers = async () => {
  const result = await prisma.member.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  return result;
};

const EditMember = async (id: string, payload: Partial<IMember>) => {
  const isMemberExist = await prisma.member.findUnique({
    where: {
      id,
    },
  });

  if (!isMemberExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Member not found');
  }

  const result = await prisma.member.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const DeleteMember = async (id: string) => {
  const isMemberExist = await prisma.member.findUnique({
    where: {
      id,
    },
  });

  if (!isMemberExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Member not found');
  }

  await prisma.member.delete({
    where: {
      id,
    },
  });
};

const MemberService = {
  CreateMember,
  GetAllMembers,
  EditMember,
  DeleteMember,
};

export default MemberService;
