import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE } from '../constants/actionTypes'

const initialState = {
    error: null,
    orders: [],
    page: 1,
    size: 10
}

const Orders = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                page: action.data.page,
                size: action.data.size
            }
        case GET_ORDERS_SUCCESS:
            return {
                orders: action.data
            }
        case GET_ORDERS_FAILURE:
            return {
                error: action.data
            }
        default:
            return state
    }
}

export default Orders