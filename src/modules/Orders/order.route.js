import express from 'express';

export const router = express.Router();

import {
    createOrder,
    updateOrder,
    deleteOrder,
    findAllUserOrders,
} from "./order.controller.js"

import { protect } from '../Users/users.middleware.js'

router.use(protect)

router.route('/').post(createOrder);

router.route('/:id')
    .patch(updateOrder)
    .delete(deleteOrder);

router.route('/:me').get(findAllUserOrders);
