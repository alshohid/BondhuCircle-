import { NextFunction , Request , Response } from "express"
import ReviewService from "./review.service"
import { ReviewModel } from "./review.model";
const createReview =async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const reviewerData = req.body;
        const reviewer = req.user as {_id:string}
      
        if(!reviewer._id){
            return res.status(401).json({ msg: "Unauthorized", data: null });
        }
        const reviewerResult =  await ReviewService.reviewPostData({
            ...reviewerData,
            reviewerId:reviewer._id
        })
        if(!reviewerResult){
            return res.status(400).json({
                msg:"No Revew created"
            })
        }
        res.status(200).json({
            msg:"Review Posted Successfully",
            data:reviewerResult
        })


    } catch (error) {
        next(error)
    }

}

export const getReviewsByResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { resourceId } = req.params;
  
      const reviews = await ReviewModel.find({ resourceId }).populate('reviewerId', 'name email')
  
      res.status(200).json({
        message: 'Reviews fetched successfully',
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  };
export const ReviewController= {
    createReview,getReviewsByResource
}