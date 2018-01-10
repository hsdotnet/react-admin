import { select, put, call } from 'redux-saga/effects'
import { getOrdersSuccessAction, getOrdersFailureAction } from '../actions/order'
import { orders } from './api'

export function* ordersAsync() {
    //const entriesMap = yield select(getEntries)
    const token = localStorage.getItem('token')
    const json = yield call(orders, 1, 15, token)
    if (json) {
        yield put(getOrdersSuccessAction(json))
    } else {
        yield put(getOrdersFailureAction('获取条目列表失败'))
    }
}