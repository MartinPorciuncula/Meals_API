import { AppError, catchAsync } from "../../errors/index.js";
import { ReviewService } from "./review_service.js";

const reviewService = new ReviewService

export const validExistReview = catchAsync(async(req,res,next) =>{
     const {id} = req.params

     const review = await reviewService.findOneReview(id)

    if(!review){
        next(new AppError("this review does not exist",404))
    }
    req.user= review.user
    req.review = review
    next()
})