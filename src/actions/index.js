import { TOGGLE_SIDER, GET_USERS } from '../constants/actionTypes'
import { get, post } from '../utils/ajax'

export const toggleSider = (expand) => {
    return { type: TOGGLE_SIDER, expand }
}

const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const fetchUsers = () => (dispatch) => {
    get('/api/order/list', json => {
        dispatch(getUsers(json))
    })
}