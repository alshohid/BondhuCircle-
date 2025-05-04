// src/types/express/index.d.ts
import { IUser } from "../../app/modules/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export {};  