

import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema <IReview>({
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

export const ReviewModel = model<IReview>('Review', reviewSchema);
