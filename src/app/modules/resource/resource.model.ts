import { Schema, model, Model, Types } from "mongoose";
import { IResource } from "./resource.interface";

const resourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },
    type: {
      type: String,
      enum: ["free", "rent", "exchange"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);


export const ResourceModel = model<IResource>("Resource", resourceSchema);
