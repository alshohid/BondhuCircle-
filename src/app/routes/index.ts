import  express  from 'express';
import {CowRoutes} from "../modules/cow/cow.route"
import { UserRoute } from '../modules/user/user.route';
import { UserResource } from '../modules/resource/resource.route';

const router = express.Router()

const moduleRoutes = [
    {
        path:'/cows',
        route:CowRoutes
    },{
        path:'/user',
        route:UserRoute
    },{
        path:'/resource',
        route:UserResource
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;