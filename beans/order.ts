import { Product } from '~/beans/product'
import { OrderStatus } from '~/enums/OrderStatus'

export interface Order {
    id: number,
    orderId: string,
    amount: number,
    status: OrderStatus,
    products: Product[]
}
