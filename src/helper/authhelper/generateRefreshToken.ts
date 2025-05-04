 
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { IUser } from "../../app/modules/user/user.interface";


type StringValue = `${number}${"s" | "m" | "h" | "d"}`; 

export const generateRefreshToken = (user: IUser): string => {
  const payload: {
    _id: string;
    phone: string;
    role?: string;
  } = {
    _id: user._id.toString(),
    phone: user.phone,
  };

  if (user.role) {
    payload.role = user.role;
  }

  const secretKey: Secret = config.jwt.refresh_secret as Secret;

  const expiresIn: StringValue = config.jwt.refresh_expires_in as StringValue;

  const signOptions: SignOptions = {
    expiresIn,
  };

  const refreshToken = jwt.sign(payload, secretKey, signOptions);

  return refreshToken;
};
