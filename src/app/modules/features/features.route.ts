import express from 'express';
import { FeatureController } from './features.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLES.ADMIN),
  FeatureController.createFeatures,
);

router.get(
  '/',
  FeatureController.getAllFeatures,
);

router.get(
  '/:id',
  FeatureController.getDetailsFeatures,
);

export const FeatureRoutes = router;
