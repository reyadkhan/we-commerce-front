<template>
    <div class='p-5'>
        <div class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-10">
            <table class="table-auto">
                <thead>
                <tr>
                    <th class="px-4 py-2 text-emerald-600">#</th>
                    <th class="px-4 py-2 text-emerald-600">Order number</th>
                    <th class="px-4 py-2 text-emerald-600">Amount</th>
                    <th class="px-4 py-2 text-emerald-600">Status</th>
                    <th class="px-4 py-2 text-emerald-600">Product count</th>
                    <th class="px-4 py-2 text-emerald-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                    <Order v-for='(order, index) in orders' :key='order.id' :order='order' :index='index' @order-deleted='orderDeleted'  />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue';
import { Order } from '~/beans/order'

export default Vue.extend({
    props: {
        orders: {
            type: Array as PropType<Order[]>,
            required: true
        }
    },
    methods: {
        orderDeleted() {
            this.$emit('refresh');
        }
    }
})
</script>
