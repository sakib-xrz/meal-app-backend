import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '@prisma/client';
import auth from '../../middlewares/auth';
import MealValidations from './meal.validations';
import MealController from './meal.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth(Role.ADMIN),
    validateRequest(MealValidations.CreateMealSchema),
    MealController.CreateMeal,
  )
  .get(MealController.GetAllMeals);

router
  .route('/:id')
  .patch(
    auth(Role.ADMIN),
    validateRequest(MealValidations.EditMealSchema),
    MealController.EditMeal,
  )
  .get(MealController.GetAllMealsForSingleMember);

export const MealRoutes = router;
