import Restaurant from "../Restaurants/restaurant.model.js"
import Meal from "./meals.model.js"
import { Op } from "sequelize";

export class MealServices {

  async findAllMeals() {
    return await Meal.findAll({
      where: {
        status: {
          [Op.notIn]: [false],
        },
      },
      include: [
        {
          model: Restaurant,
          attributes: ["name", "address", "rating", "status"],
        },
      ],
    });
  }

  async createMeal(data) {
    return await Meal.create(data)
  }

  async findOneMeal(id) {
    return await Meal.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Restaurant,
          attributes: ['name', 'address', 'rating', 'status']
        }
      ]
    })
  }

  async updateMeal(meal, data) {
    return await meal.update(data)
  }

  async deleteMeal(meal) {
    return await meal.update({
      status: false
    })
  }
}