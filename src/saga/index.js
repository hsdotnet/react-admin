import { takeLatest, takeEvery } from 'redux-saga/effects'
import { ordersAsync } from './order'
import { GET_ORDERS } from '../constants/actionTypes'

export default function* rootSaga() {
    yield [
        takeLatest(GET_ORDERS, ordersAsync)
    ]
}