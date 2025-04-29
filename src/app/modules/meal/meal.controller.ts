import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import MealService from './meal.service';

const CreateMeal = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await MealService.CreateMeal(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Meal created successfully',
    data: result,
  });
});

const EditMeal = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await MealService.EditMeal(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Meal updated successfully',
    data: result,
  });
});

const GetAllMealsForSingleMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query;

  const result = await MealService.GetAllMealsForSingleMember(id, query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Meals retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const GetAllMeals = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await MealService.GetAllMeals(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Meals retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const MealController = {
  CreateMeal,
  EditMeal,
  GetAllMealsForSingleMember,
  GetAllMeals,
};

export default MealController;
