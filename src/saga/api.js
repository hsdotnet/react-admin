import fetch from 'isomorphic-fetch'

export const orders = (page = 0, size = 15, token) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    return fetch(`/api/order/list?page=${page}&size=${size}`, {
        method: 'GET',
        headers: headers
    }).then(response => response.json()).then(json => {
        return json
    }).catch(ex => console.log('parsing failed', ex))
}