import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BazarService from './bazar.service';
import { IBazar } from './bazar.interface';

const CreateBazar = catchAsync(async (req, res) => {
  const payload = req.body as IBazar;

  const result = await BazarService.CreateBazar(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Bazar created successfully',
    data: result,
  });
});

const GetAllBazars = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await BazarService.GetAllBazars(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bazars retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const EditBazar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body as IBazar;

  const result = await BazarService.EditBazar(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bazar updated successfully',
    data: result,
  });
});

const DeleteBazar = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BazarService.DeleteBazar(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bazar deleted successfully',
  });
});

const BazarController = {
  CreateBazar,
  GetAllBazars,
  EditBazar,
  DeleteBazar,
};

export default BazarController;
