import { AppError, catchAsync } from "../../errors/index.js"
import { validateMeal } from "./meals.schema.js"
import { MealServices } from "./meals.service.js"

export const mealService = new MealServices()

export const findAllMeals = catchAsync(async (req, res, next) => {
    const meals = await mealService.findAllMeals()

    return res.status(200).json(meals)
})

export const createMeals = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, mealData } = validateMeal(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { name, price } = req.body
    const { id } = req.params

    const meal = await mealService.createMeal({
        name,
        price,
        restaurantId: id
    })

    return res.status(201).json(meal)
})

export const findOneMeals = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const meal = await mealService.findOneMeal(id)

    if (!meal) {
        return next(new AppError(`Meal whit id ${id} not found`, 422))
    }

    return res.json(meal)
})

export const updateMeals = catchAsync(async (req, res, next) => {

    const { hasError, errorMessages, mealData } = validateMeal(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params

    const meal = await mealService.findOneMeal(id)

    if (!meal) {
        return next(new AppError(`Meal whit id ${id} not found`, 422))
    }

    const updateMeal = await mealService.updateMeal(meal, mealData)

    return res.status(200).json(updateMeal)

})

export const deleteMeals = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const meal = await mealService.findOneMeal(id)

    if (!meal) {
        return next(new AppError(`Meal whit id ${id} not found`, 422))
    }

    await mealService.deleteMeal(meal)

    return res.status(200).json()
});