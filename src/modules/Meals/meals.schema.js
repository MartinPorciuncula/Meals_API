import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const mealsSchema = z.object({
    name: z.string().min(3).max(150),
    price: z.string().min(1).max(15)
})

export const validateMeal = (data) => {
    const result = mealsSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: mealData
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        mealData
    }
}