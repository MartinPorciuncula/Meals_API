import { AppError, catchAsync } from "../../errors/index.js";
import { RestaurantService } from "./restaurant_service.js";

const restaurantService = new RestaurantService

export const validExistRestaurant = catchAsync(async(req,res,next) => {

    const {id,restaurantId} = req.params;

    const restaurant = await restaurantService.findOneRestaurant(id,restaurantId)

    if(!restaurant){
        next(new AppError("This restaurant does not exist",404))
    }

    req.restaurant = restaurant;
    next()

})