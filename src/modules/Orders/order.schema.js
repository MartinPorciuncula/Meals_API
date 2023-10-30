import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const orderSchema = z.object({
    quantity: z.number().positive(),
    mealId: z.number().positive()
})

export const validateOrder = (data) => {
    const result = orderSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: orderData
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        orderData
    }
}