import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE } from './OrderActions'

const initialState = {
    error: '',
    orders: []
}

const OrderReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                error: '',
                orders: []
            }
        case GET_ORDERS_SUCCESS:
            return {
                error: '',
                orders: action.orders
            }
        case GET_ORDERS_FAILURE:
            return {
                error: action.error,
                orders: []
            }
        default:
            return state
    }
}

export default OrderReducer