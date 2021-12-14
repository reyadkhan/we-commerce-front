<template>
    <FetchState v-if='$fetchState.pending || $fetchState.error' :fetch-state='$fetchState' class='mt-5' />
    <div v-else class='m-7'>
        <p class='text-right mb-3'>
            <NuxtLink v-if='$auth.user.isAdmin' to='/admin/orders' class='px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white border'>Back</NuxtLink>
            <NuxtLink v-else to='/orders' class='px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white border'>Back</NuxtLink>
        </p>
        <div class='bg-white p-7'>
            <p><span class='font-bold'>Order id:</span> {{ order.orderId }}</p>
            <p><span class='font-bold'>Status:</span> <span :class='order.status === orderStatus.REJECTED ? "text-red-600" : ""'>{{ order.status }}</span></p>
            <p><span class='font-bold'>Order amount:</span> {{ order.amount }}</p>
            <p class='font-bold'>Products:</p>
            <div class='pl-5'>
                <div class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-5">
                    <table class="table-auto">
                        <thead>
                        <tr>
                            <th class="px-4 py-2 text-emerald-600">#</th>
                            <th class="px-4 py-2 text-emerald-600">Name</th>
                            <th class="px-4 py-2 text-emerald-600">Price</th>
                            <th class="px-4 py-2 text-emerald-600">Quantity</th>
                            <th class="px-4 py-2 text-emerald-600">Details</th>
                            <th class="px-4 py-2 text-emerald-600">Photo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for='(product, index) in order.products' :key='product.id'>
                            <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ index + 1 }}</td>
                            <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.name }}</td>
                            <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.price }}</td>
                            <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.qty }}</td>
                            <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.desc }}</td>
                            <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                                <img v-if='product.img' :src='product.img' class='w-40' alt='Product image'>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p class='font-bold mt-5'>History:</p>
            <div class='pl-5'>
                <OrderHistory :orderId='order.id' />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Order } from '~/beans/order'
import { OrderStatus } from '~/enums/OrderStatus'

export default Vue.extend({
    data: () => ({
        order: {} as Order,
        orderStatus: OrderStatus
    }),
    async fetch() {
        this.order = await this.$axios.$get('orders/' + this.$route.params.id)
    }
})
</script>
