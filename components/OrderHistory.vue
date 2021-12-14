<template>
    <FetchState v-if='$fetchState.pending || $fetchState.error' :fetch-state='$fetchState' class='mt-5' />
    <div v-else class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-5">
        <table class="table-auto">
            <thead>
            <tr>
                <th class="px-4 py-2 text-emerald-600">#</th>
                <th class="px-4 py-2 text-emerald-600">Status</th>
                <th class="px-4 py-2 text-emerald-600">Total price</th>
                <th class="px-4 py-2 text-emerald-600">Total quantity</th>
                <th class="px-4 py-2 text-emerald-600">Details</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='(history, index) in orderHistory' :key='history.id'>
                <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ index + 1 }}</td>
                <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ history.status }}</td>
                <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ history.orderPrice }}</td>
                <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ history.orderQuantity }}</td>
                <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ history.details }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { Product } from '~/beans/product'

interface OrderHistory {
    id: number,
    status: string,
    orderPrice: number,
    orderQuantity: number,
    details: string,
    products: Product[]
}

export default Vue.extend({
    props: {
        orderId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        orderHistory: Array as PropType<OrderHistory[]>
    }),
    async fetch() {
        this.orderHistory = await this.$axios.$get(`orders/${this.orderId}/tracking-histories`)
    }
})
</script>
