import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { IBazar } from './bazar.interface';
import {
  calculatePagination,
  PaginationOptions,
} from '../../utils/calculatePagination';
import { pick } from '../../utils/pick';
import { Prisma } from '@prisma/client';

const CreateBazar = async (payload: IBazar) => {
  const isMemberExist = await prisma.member.findUnique({
    where: {
      id: payload.purchased_by,
    },
  });

  if (!isMemberExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Member not found');
  }

  const result = await prisma.bazar.create({
    data: payload,
  });

  return result;
};

const GetAllBazars = async (query: Record<string, unknown>) => {
  const todaysDate = new Date();
  const defaultEndDate = todaysDate.toISOString().split('T')[0];

  const last30Days = new Date(todaysDate);
  last30Days.setDate(last30Days.getDate() - 30);
  const defaultStartDate = last30Days.toISOString().split('T')[0];

  const { start_date, end_date, ...otherQueries } = query;

  const startDate = (start_date as string) || defaultStartDate;
  const endDate = (end_date as string) || defaultEndDate;

  const options = pick(otherQueries, [
    'limit',
    'page',
    'sort_by',
    'sort_order',
  ]);

  const { page, limit, skip } = calculatePagination(
    options as PaginationOptions,
  );

  const whereConditions: Prisma.BazarWhereInput = {
    date: {
      gte: startDate,
      lte: endDate,
    },
  };

  if (query?.purchased_by) {
    whereConditions.purchased_by = query.purchased_by;
  }

  const data = await prisma.bazar.findMany({
    where: whereConditions,
    include: {
      member: true,
    },
    skip,
    take: limit,
    orderBy: {
      created_at: 'desc',
    },
  });

  const total = await prisma.bazar.count({
    where: whereConditions,
  });

  const totalBazarAmount = await prisma.bazar.aggregate({
    _sum: {
      amount: true,
    },
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: {
      bazars: data,
      total_bazar_amount: totalBazarAmount._sum.amount || 0,
    },
  };
};

const EditBazar = async (id: string, payload: Partial<IBazar>) => {
  const isBazarExist = await prisma.bazar.findUnique({
    where: {
      id,
    },
  });

  if (!isBazarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bazar not found');
  }

  const result = await prisma.bazar.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const DeleteBazar = async (id: string) => {
  const isBazarExist = await prisma.bazar.findUnique({
    where: {
      id,
    },
  });

  if (!isBazarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bazar not found');
  }

  await prisma.bazar.delete({
    where: {
      id,
    },
  });
};

const BazarService = {
  CreateBazar,
  GetAllBazars,
  EditBazar,
  DeleteBazar,
};

export default BazarService;
