import express from 'express';

export const router = express.Router();

import {
      findAllRestaurants,
      CreateRestaurant,
      findOneRestaurant,
      updateRestaurant,
      deleteRestaurant,
      createReviewToRestaurant,
      updateReview,
      deleteReview,
} from "./restaurants.controller.js"
import { validExistRestaurant } from "./restaurant.middleware.js"
import { validExistReview } from "../Reviews/review.middleware.js"
import { protect, protectAccountOwner, restrictTo } from "../Users/users.middleware.js"

router.route('/')
      .get(findAllRestaurants)
      router.route("/:id")
      .get(findOneRestaurant)

      router.use(protect)

      router.route("/")
      .post(CreateRestaurant,restrictTo("admin"))

router.route('/:id')
      .patch(restrictTo("admin"),updateRestaurant)
      .delete(restrictTo("admin"),deleteRestaurant)

router.post("/reviews/:id", validExistRestaurant, createReviewToRestaurant)

router.route("/reviews/:restaurantId/:id")
      .patch(validExistRestaurant, validExistReview, protectAccountOwner, updateReview)
      .delete(validExistRestaurant, validExistReview, protectAccountOwner, deleteReview)