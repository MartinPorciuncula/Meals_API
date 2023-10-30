import Restaurant from './restaurant.model.js';
import Review from '../Reviews/review.model.js'

export class RestaurantService {

  async findAllRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: Review,
          attributes: ['comment', 'rating']
        }
      ]
    });
  }

  async createRestaurant(data) {
    return await Restaurant.create(data);
  }

  async findOneRestaurant(id, restaurantId) {
    return await Restaurant.findOne({
      where: {
        status: true,
        id: restaurantId || id
      },
      include: [
        {
          model: Review,
          attributes: ['comment', 'rating']
        }
      ]
    });
  }

  async updateRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }

  async deleteRestaurant(restaurant) {
    return await restaurant.update({
      status: false,
    });
  }
}