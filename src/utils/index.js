export const createReducer = (initialState, handlerMap) => (state = initialState, action) => {
    const handler = (action && action.type) ? handlerMap[action.type] : undefined
    return handler ? handler(state, action) : state
}

export const keyMirror = (obj) => {
    let key
    let mirrored = {}
    if (obj && typeof obj === 'object') {
        for (key in obj) {
            if ({}.hasOwnProperty.call(obj, key)) {
                mirrored[key] = key
            }
        }
    }
    return mirrored
}

export const deepClone = (obj) => {
    let proto = Object.getPrototypeOf(obj)
    return Object.assign({}, Object.create(proto), obj)
}

export const queryArray = (array, key, keyAlias = 'key') => {
    if (!!array && array instanceof Array) {
        return array.find(item => item[keyAlias] === key)
    }
    return null
}
