import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import MemberService from './member.service';

const CreateMember = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await MemberService.CreateMember(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Member created successfully',
    data: result,
  });
});

const GetAllMembers = catchAsync(async (_req, res) => {
  const result = await MemberService.GetAllMembers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Members retrieved successfully',
    data: result,
  });
});

const EditMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await MemberService.EditMember(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Member updated successfully',
    data: result,
  });
});

const DeleteMember = catchAsync(async (req, res) => {
  const { id } = req.params;

  await MemberService.DeleteMember(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Member deleted successfully',
  });
});

const MemberController = {
  CreateMember,
  GetAllMembers,
  EditMember,
  DeleteMember,
};

export default MemberController;
