<template>
    <tr>
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ index + 1 }}</td>
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ order.orderId }}</td>
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ order.amount }}</td>
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
            <select v-if='$auth.user.isAdmin' v-model='status' class='h-7' @change='updateStatus'>
                <option v-for='status in orderStatus' :key='status' :value='status'>{{ status }}</option>
            </select>
            <template v-else>{{ order.status }}</template>
        </td>
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ order.products.length }}</td>
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
            <div class='flex'>
                <template v-if='$auth.user.isAdmin'>
                    <NuxtLink :to='"/admin/orders/" + order.id'>
                        <em class='fa fa-eye mr-2 rounded bg-indigo-500 text-indigo-100 hover:text-white cursor-pointer p-2' title='Details'></em>
                    </NuxtLink>
                </template>
                <template v-else>
                    <NuxtLink :to='"/orders/" + order.id'>
                        <em class='fa fa-eye mr-2 rounded bg-indigo-500 text-indigo-100 hover:text-white cursor-pointer p-2' title='Details'></em>
                    </NuxtLink>
                    <NuxtLink v-if='order.status === orderStatus.CREATED' :to='"/orders/" + order.id + "/edit"'>
                        <em class='fa fa-edit mr-2 rounded bg-indigo-500 text-indigo-100 hover:text-white cursor-pointer p-2' title='Edit'></em>
                    </NuxtLink>
                    <span v-if='order.status === orderStatus.CREATED || order.status === orderStatus.REJECTED' @click.prevent='deleteOrder'>
                        <em class='fa mr-2 rounded bg-red-500 text-indigo-100 hover:text-white cursor-pointer p-2' :class='deleting ? "fa-check" : "fa-trash"' title='Delete'></em>
                    </span>
                </template>
            </div>
        </td>
    </tr>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { Order } from '~/beans/order'
import { OrderStatus } from '~/enums/OrderStatus'

export default Vue.extend({
    props: {
        order: {
            type: Object as PropType<Order>,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        orderStatus: OrderStatus,
        status: '',
        deleting: false
    }),
    created() {
        this.status = this.order.status
    },
    methods: {
        updateStatus() {
            if(this.order.status === this.orderStatus.REJECTED
                || this.status === this.orderStatus.CREATED) {
                this.status = this.order.status
                this.$notifier.show("Status is not allowed to change")
            } else {
                this.$axios.$patch("orders/" + this.order.id + "/status/" + this.status)
                    .then(() => {
                        this.$notifier.show("Order[" + this.order.orderId + "] status successfully updated to '" + this.status + "'", 'Success !', 'indigo');
                    }).catch(e => {
                        this.status = this.order.status;
                        this.$notifier.show('Status update failed. Message: ' + e.response.data.message)
                    })
            }
        },
        async deleteOrder() {
            if(this.deleting) {
                await this.$axios.$delete('orders/' + this.order.id);
                this.$emit('order-deleted');
            } else {
                this.deleting = true;
            }
        }
    }
})
</script>
