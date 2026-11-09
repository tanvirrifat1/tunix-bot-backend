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

const getAllFeatures = async (query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;

  const anyConditions: any[] = [];

  // Search by title
  if (searchTerm) {
    anyConditions.push({
      title: { $regex: searchTerm, $options: 'i' },
    });
  }

  // Filter by specific fields if provided
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(([field, value]) => {
      if (typeof value === 'string' && field === 'title') {
        return { [field]: { $regex: value, $options: 'i' } };
      }
      return { [field]: value };
    });
    anyConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  // Pagination setup
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  const result = await Feature.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const total = await Feature.countDocuments(whereConditions);
  const totalPages = Math.ceil(total / size);

  return {
    meta: {
      page: pages,
      limit: size,
      total,
      totalPage: totalPages,
    },
    data: result,
  };
};

const getDetailsFeatures = async (id: string) => {
  const result = await Feature.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Features not found');
  }

  return result;
};

export const FeatureService = {
  createFeatures,
  getAllFeatures,
  getDetailsFeatures,
};
