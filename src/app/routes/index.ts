import  express  from 'express';
import {CowRoutes} from "../modules/cow/cow.route"

const router = express.Router()

const moduleRoutes = [
    {
        path:'/cows',
        route:CowRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;