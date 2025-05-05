import  express  from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router= express.Router()

router.post('/auth/signup', UserController.signup)
router.post('/auth/login',UserController.loginUser)
router.get('/my-profiles' ,auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), UserController.getUserOwnProfile)
router.post('/auth/refresh-token',UserController.refreshToken)
router.delete('/users/:id',auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)

export const UserRoute= router;