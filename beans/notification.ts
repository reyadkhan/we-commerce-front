import { Order } from '~/beans/order'

export interface Notification {
    id: number,
    title: string,
    details: string,
    isRead: boolean,
    order: Order | null
}
