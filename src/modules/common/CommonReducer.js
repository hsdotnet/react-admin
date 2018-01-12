import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE } from './CommonActions'

const initialState = {
    loading: false,
    error: null,
    data: [],
    total: 0,
    query: { page: 1, size: 10 }
}

const CommonReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_DATA:
            return Object.assign({}, state, {
                loading: true,
                query: action.query
            })
        case GET_DATA_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.items,
                total: action.data.total
            })
        case GET_DATA_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        default:
            return state
    }
}

export default CommonReducer