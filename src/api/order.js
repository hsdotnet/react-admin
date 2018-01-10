import { get } from '../utils/ajax'

export function getOrders() {
    return get('/api/order/list')
}