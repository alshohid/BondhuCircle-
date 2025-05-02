import  express  from 'express';
import { CowController } from './cow.controller';

const router = express.Router()
router.post("/",CowController.cowPostCreated);
router.get("/:id",CowController.getSingleCow)
router.get("/", CowController.getAllCows)

export const CowRoutes = router;