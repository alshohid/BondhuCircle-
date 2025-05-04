 

import { Types } from 'mongoose';

export interface IReview {
  reviewerId: Types.ObjectId;      
  resourceId: Types.ObjectId;      
  rating: number;                 
  comment?: string;                
  createdAt?: Date;               
  updatedAt?: Date;                
}
