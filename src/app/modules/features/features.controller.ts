import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeatureService } from './features.service';

const createFeatures = catchAsync(async (req, res) => {
  const result = await FeatureService.createFeatures(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Features created successfully',
    data: result,
  });
});

const getAllFeatures = catchAsync(async (req, res) => {
  const result = await FeatureService.getAllFeatures(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Features retrieved successfully',
    pagination: result.meta,
    data: result.data,
  });
});

const getDetailsFeatures = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FeatureService.getDetailsFeatures(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Feature details retrieved successfully',
    data: result,
  });
});

export const FeatureController = {
  createFeatures,
  getAllFeatures,
  getDetailsFeatures,
};
