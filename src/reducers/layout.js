import { TOGGLE_SIDER, GET_USERS } from '../constants/actionTypes';

/*
const initialState = {
    navClass: 'px-nav',
    expand: document.body.clientWidth > 992
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDER:
            return {
                navClass: action.expand ? 'px-nav px-nav-collapse' : 'px-nav px-nav-expand',
                expand: !action.expand
            }
        default:
            return state
    }
}*/

export default (state = [], action) => {
    switch (action.type) {
        case GET_USERS:
            return action.users
        default:
            return state
    }
}