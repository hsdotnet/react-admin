import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE, getOrdersSuccessAction, getOrdersFailureAction } from './OrderActions'
import { getOrders } from '../../api/order'

function* getOrdersAsync() {
    try {
        const json = yield call(getOrders)
        if (json.success) {
            yield put(getOrdersSuccessAction(json.data))
        } else {
            yield put(getOrdersFailureAction(json.message))
        }
    } catch (error) {
        yield put(getOrdersFailureAction(error.response.statusText))
    }
}

function* watchGetOrdersAsync() {
    yield takeLatest(GET_ORDERS, getOrdersAsync)
}

export default function* root() {
    yield all([
        fork(watchGetOrdersAsync)
    ])
}