import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE } from '../constants/actionTypes'

export const getOrdersAction = (page = 1, size = 10) => {
    return {
        type: GET_ORDERS,
        data: { page, size }
    }
}

export const getOrdersSuccessAction = (orders) => {
    return {
        type: GET_ORDERS_SUCCESS,
        data: orders
    }
}

export const getOrdersFailureAction = (error) => {
    return {
        type: GET_ORDERS_FAILURE,
        data: error
    }
}