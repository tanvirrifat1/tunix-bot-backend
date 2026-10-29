import { model, Schema } from 'mongoose';
import { IFeatures } from './features.interface';

const featureSchema = new Schema<IFeatures>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    des: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Feature = model<IFeatures>('Feature', featureSchema);
