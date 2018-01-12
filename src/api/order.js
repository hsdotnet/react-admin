import { get } from '../utils/ajax'
import { api } from './api'

export function getOrders(query) {
    return get(`${api.orderApi}/order/list`, query)
}