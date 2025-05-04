import { IReview } from "./review.interface"
import { ReviewModel } from "./review.model"


 const reviewPostData= async(reviewerData:IReview)=>{
    const postedResult = await ReviewModel.create(reviewerData);
    if(!postedResult){
        throw new Error("Post Not created , error occuring")
    }
    return postedResult;
 }
 export default {
    reviewPostData
 }