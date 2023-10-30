import express from 'express';

import {
  findAllMeals,
  findOneMeals,
  updateMeals,
  deleteMeals,
  createMeals,
} from "./meals.controller.js"

import { validExistRestaurant } from '../Restaurants/restaurant.middleware.js'
import { protect, restrictTo } from '../Users/users.middleware.js';

export const router = express.Router();

router.route('/').get(findAllMeals)

router.route("/:id").get(findOneMeals)

router.use(protect)

router.route('/:id').post(validExistRestaurant, restrictTo("admin"), createMeals)

router.route('/:id')
  .patch(restrictTo("admin"), updateMeals)
  .delete(restrictTo("admin"), deleteMeals)

