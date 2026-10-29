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

export const FeatureController = {
  createFeatures,
};
