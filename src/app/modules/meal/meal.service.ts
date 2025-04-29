import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { IMeal } from './meal.interface';
import { pick } from '../../utils/pick';
import {
  calculatePagination,
  PaginationOptions,
} from '../../utils/calculatePagination';
import { Prisma } from '@prisma/client';

const CreateMeal = async (payload: IMeal) => {
  const isMemberExist = await prisma.member.findUnique({
    where: {
      id: payload.member_id,
    },
  });

  if (!isMemberExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Member not found');
  }

  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = String(todaysDate.getMonth() + 1).padStart(2, '0');
  const day = String(todaysDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const isMealExistOnToday = await prisma.meal.findFirst({
    where: {
      member_id: payload.member_id,
      date: formattedDate,
    },
  });

  if (isMealExistOnToday) {
    throw new AppError(httpStatus.CONFLICT, 'Meal already exists for today');
  }

  const result = await prisma.meal.create({
    data: payload,
  });

  return result;
};

const EditMeal = async (id: string, payload: Partial<IMeal>) => {
  const isMealExist = await prisma.meal.findUnique({
    where: {
      id,
    },
  });

  if (!isMealExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Meal not found');
  }

  const result = await prisma.meal.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const GetAllMealsForSingleMember = async (
  id: string,
  query: Record<string, unknown>,
) => {
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

  const whereConditions: Prisma.MealWhereInput = {
    member_id: id,
    date: {
      gte: startDate,
      lte: endDate,
    },
  };

  const sortBy = options.sort_by as string | undefined;
  const sortOrder = (options.sort_order as string)?.toLowerCase();
  const orderByCondition: Prisma.MealOrderByWithRelationInput =
    sortBy && sortOrder
      ? {
          [sortBy]: sortOrder,
        }
      : {
          created_at: 'desc',
        };

  const data = await prisma.meal.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: orderByCondition,
  });

  const total = await prisma.meal.count({
    where: whereConditions,
  });

  const totalMeal = await prisma.meal.aggregate({
    _sum: {
      quantity: true,
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
      meals: data,
      total_meal_quantity: totalMeal._sum.quantity || 0,
    },
  };
};

const GetAllMeals = async (query: Record<string, unknown>) => {
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

  const whereConditions: Prisma.MealWhereInput = {
    date: {
      gte: startDate,
      lte: endDate,
    },
  };

  const sortBy = options.sort_by as string | undefined;
  const sortOrder = (options.sort_order as string)?.toLowerCase();
  const orderByCondition: Prisma.MealOrderByWithRelationInput =
    sortBy && sortOrder
      ? {
          [sortBy]: sortOrder,
        }
      : {
          created_at: 'desc',
        };

  const data = await prisma.meal.findMany({
    where: whereConditions,
    include: {
      member: true,
    },
    skip,
    take: limit,
    orderBy: orderByCondition,
  });

  const total = await prisma.meal.count({
    where: whereConditions,
  });

  const totalMeal = await prisma.meal.aggregate({
    _sum: {
      quantity: true,
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
      meals: data,
      total_meal_quantity: totalMeal._sum.quantity || 0,
    },
  };
};

const MealService = {
  CreateMeal,
  EditMeal,
  GetAllMealsForSingleMember,
  GetAllMeals,
};

export default MealService;
