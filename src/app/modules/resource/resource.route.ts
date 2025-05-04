import  express  from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ResourceController } from './resource.controller';
import auth from '../../middlewares/auth';


const router = express.Router()

 router.post('/post', ResourceController.ResourcePost)

export const UserResource= router