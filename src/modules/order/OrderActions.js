export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE'

export const getOrdersAction = () => {
    return {
        type: GET_ORDERS
    }
}

export const getOrdersSuccessAction = (orders) => {
    return {
        type: GET_ORDERS_SUCCESS,
        orders
    }
}

export const getOrdersFailureAction = (error) => {
    return {
        type: GET_ORDERS_FAILURE,
        error
    }
}