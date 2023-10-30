import User from '../Users/user.model.js';
import Review from './review.model.js';

export class ReviewService {

  async findOneReview(id) {
    return Review.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        },
      ],
    });
  }

  async createReview(data) {
    return Review.create(data)
  }

  async updateReview(review, data) {
    return review.update(data)
  }

  async deleteReview(review) {
    return review.update({
      status: 'deleted'
    })
  }

}