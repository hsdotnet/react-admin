import Immutable from 'immutable'
import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE } from './OrderActions'

const initialState = Immutable.fromJS({
    error: '',
    orders: []
})

const OrderReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ORDERS:
            return state.merge({
                error: ''
            })
        case GET_ORDERS_SUCCESS:
            return state.merge({
                error: '',
                orders: action.orders
            })
        case GET_ORDERS_FAILURE:
            return state.merge({
                error: action.error
            })
        default:
            return state
    }
}

export default OrderReducer