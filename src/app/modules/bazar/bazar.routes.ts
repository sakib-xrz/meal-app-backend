import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '@prisma/client';
import auth from '../../middlewares/auth';
import BazarValidations from './bazar.validations';
import BazarController from './bazar.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth(Role.ADMIN),
    validateRequest(BazarValidations.CreateBazarSchema),
    BazarController.CreateBazar,
  )
  .get(BazarController.GetAllBazars);

router
  .route('/:id')
  .patch(
    auth(Role.ADMIN),
    validateRequest(BazarValidations.EditBazarSchema),
    BazarController.EditBazar,
  )
  .delete(auth(Role.ADMIN), BazarController.DeleteBazar);

export const BazarRoutes = router;
