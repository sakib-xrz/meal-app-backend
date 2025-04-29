import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import MemberValidations from './member.validations';
import MemberController from './member.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router
  .route('/')
  .post(
    auth(Role.ADMIN),
    validateRequest(MemberValidations.CreateMemberSchema),
    MemberController.CreateMember,
  )
  .get(MemberController.GetAllMembers);

router
  .route('/:id')
  .patch(
    auth(Role.ADMIN),
    validateRequest(MemberValidations.EditMemberSchema),
    MemberController.EditMember,
  )
  .delete(auth(Role.ADMIN), MemberController.DeleteMember);

export const MemberRoutes = router;
