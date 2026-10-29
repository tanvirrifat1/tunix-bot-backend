import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IFeatures } from './features.interface';
import { Feature } from './features.model';

const createFeatures = async (payload: IFeatures) => {
  const isExistData = await Feature.findOne({ title: payload.title });

  if (isExistData) {
    throw new ApiError(StatusCodes.CONFLICT, 'Features is already exist');
  }

  const result = await Feature.create(payload);

  return result;
};

export const FeatureService = {
  createFeatures,
};
