import  express  from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ResourceController } from './resource.controller';
import auth from '../../middlewares/auth';


const router = express.Router()

 router.post('/post',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), ResourceController.ResourcePost)
 router.get('/all-resource', ResourceController.getAllResource)
 router.get('/specific-user-resource',auth(), ResourceController.singleUserResource)

export const UserResource= router