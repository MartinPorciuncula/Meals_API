import express from 'express';
import { router as userRouter } from "../modules/Users/users.route.js"
import { router as restaurantRouter } from "../modules/Restaurants/restaurant.route.js"
import { router as orderRouter } from "../modules/Orders/order.route.js"
import { router as mealsRouter } from "../modules/Meals/meals.router.js"
import { protect } from '../modules/Users/users.middleware.js';

export const router = express.Router()

router.use("/users", userRouter)
router.use("/restaurants", restaurantRouter)
router.use("/orders", orderRouter)
router.use("/meals", mealsRouter)


