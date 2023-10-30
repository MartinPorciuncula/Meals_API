import { Op } from "sequelize"
import Meal from "../Meals/meals.model.js"
import Order from "../Orders/orders.model.js"
import Restaurant from "../Restaurants/restaurant.model.js"

export class OrderServices {

    async createOrder(data) {
        return await Order.create(data)
    }

    async findAllOrders(UserId) {
        return await Order.findAll({
            where: {
                status: {
                    [Op.in]: ["active"]
                },
                UserId
            },
            include: [
                {
                    model: Meal,
                    include: [
                        {
                            model: Restaurant
                        }
                    ]
                }
            ]
        })
    }

    async findOneOrder(id) {
        return await Order.findOne({
            where: {
                id,
                status: "active"
            }
        })
    }

    async updateOrder(order) {
        return await order.update({ status: "completed" })
    }

    async deleteOrder(order) {
        return await order.update({ status: "cancelled" })
    }
}