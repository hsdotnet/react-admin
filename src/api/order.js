import { get, post } from '../utils/ajax'

export const orderList = get('http://172.17.17.34:8020/order/list','')

export const orderDetail = get('http://172.17.17.34:8020/order/detail?orderCode=TK20171224000002','')