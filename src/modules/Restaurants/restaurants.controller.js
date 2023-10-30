import { AppError, catchAsync } from '../../errors/index.js';
import { ReviewService } from '../Reviews/review_service.js';
import { validateRestaurant, validateReview } from './restaurant.schema.js';
import { RestaurantService } from './restaurant_service.js';

const restaurantService = new RestaurantService();
const reviewService = new ReviewService();

export const findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await restaurantService.findAllRestaurants();

  return res.status(200).json(restaurants);
});

export const CreateRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const restaurant = await restaurantService.createRestaurant(restaurantData);

  return res.status(201).json(restaurant);
});

export const findOneRestaurant = catchAsync(async (req, res, next) => {

  const { id } = req.params

  const restaurant = await restaurantService.findOneRestaurant(id)

  if (!restaurant) {
    next(new AppError(`Restaurant whit id ${id} not found`))
  }

  return res.json(restaurant)
});

export const updateRestaurant = catchAsync(async (req, res, next) => {

  const { hasError, errorMessages, restaurantData } = validateRestaurant(req.body)

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  const { id } = req.params

  const restaurant = await restaurantService.findOneRestaurant(id)

  if (!restaurant) {
    return next(new AppError(`Restaurant whit id ${id} nor found`))
  }

  const updateRestaurant = await restaurantService.updateRestaurant(restaurant, restaurantData)

  return res.status(200).json(updateRestaurant)
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {

  const { id } = req.params

  const restaurant = await restaurantService.findOneRestaurant(id)

  if (!restaurant) {
    return next(new AppError(`Restaurant whit id ${id} not found`))
  }

  await restaurantService.deleteRestaurant(restaurant)

  return res.status(200).json()

});

export const updateReview = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, reviewData } = validateReview(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const { comment, rating } = req.body;
  const { review } = req;

  const reviewUpdated = await reviewService.updateReview(review, { comment, rating });

  return res.status(201).json(reviewUpdated)
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req

  await reviewService.deleteReview(review)

  return res.status(200).json(null)

});

export const createReviewToRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { sessionUser } = req;
  const review = await reviewService.createReview({
    comment,
    rating,
    restaurantId: id,
    userId: sessionUser.id,
  });

  return res.status(201).json(review);
});