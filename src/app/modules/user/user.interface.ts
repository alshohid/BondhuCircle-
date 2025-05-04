import { Model } from "mongoose";

export type userRole ="admin" | "user"
export interface IUser{
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    avatarUrl?: string;
    location?: string;
    rating: number;
    isVerified: boolean;
    role?:userRole,
    _id:string
}
export type UserModel = Model<IUser, Record<string,unknown>>