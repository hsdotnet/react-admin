import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects'
import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE, getDataSuccessAction, getDataFailureAction } from '../common/CommonActions'
import { getCommon } from '../common/CommonSelectors'
import { getOrders } from '../../api/order'

function* getOrdersAsync() {
    try {
        const common = yield select(getCommon)
        const json = yield call(getOrders, common.query)
        if (json.code === 1) {
            yield put(getDataSuccessAction(json.data))
        } else {
            yield put(getDataFailureAction(json.message))
        }
    } catch (error) {
        yield put(getDataFailureAction(error.response.statusText))
    }
}

function* watchGetOrdersAsync() {
    yield takeLatest(GET_DATA, getOrdersAsync)
}

export default function* root() {
    yield all([
        fork(watchGetOrdersAsync)
    ])
}