import  express  from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router()

router.post('/create',auth(), ReviewController.createReview)
router.get('/by-resource/:resourceId',ReviewController.getReviewsByResource)

export const Reviewrouter = router