import { all } from 'redux-saga/effects'
import orderSaga from '../modules/order/OrderSaga'

export default function* rootSaga() {
    yield all([
        orderSaga()
    ])
}