import { Document, Model, Types } from "mongoose";

export type ResourceType = "free" | "rent" | "exchange";
export type ResourceCondition = "new" | "used";

export interface IResource {
  title: string;
  description: string;
  category: string;
  condition: ResourceCondition;
  type: ResourceType;
  location: string;
  imageUrl?: string;
  availableFrom: Date;
  // userId: Types.ObjectId; 
}

// Add this if you use full mongoose documents
export interface IResourceDocument extends IResource, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Optional: attach this to your model
export type ResourceModel = Model<IResourceDocument>;

