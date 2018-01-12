export const GET_DATA = 'GET_DATA'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE'

export const getDataAction = (query) => {
    return {
        type: GET_DATA,
        query
    }
}

export const getDataSuccessAction = (data) => {
    return {
        type: GET_DATA_SUCCESS,
        data
    }
}

export const getDataFailureAction = (error) => {
    return {
        type: GET_DATA_FAILURE,
        error
    }
}