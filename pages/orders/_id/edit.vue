<template>
    <FetchState v-if='$fetchState.pending || $fetchState.error' :fetch-state='$fetchState' class='mt-5' />
    <div v-else class='container mx-auto'>
        <p class='text-3xl my-5 text-indigo-600'>Order Update ({{ order.orderId }})</p>
        <p class='text-right mb-3'>
            <NuxtLink to='/orders' class='px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white border'>Back</NuxtLink>
        </p>
        <div class='mt-7'>
            <div class="flex shadow-md my-10">
                <div class='w-3/4'>
                    <div v-if='errors.length > 0' class='mb-5'>
                        <p v-for='(error, index) in errors' :key='index' class="text-red-500">{{ error }}</p>
                    </div>
                    <div class="flex mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    <OrderEditProduct v-for='product in order.products' :key='product.id' :product='product' />
                </div>
                <div id="summary" class="w-1/4 px-8 py-10">
                    <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div class="flex justify-between mt-10 mb-5">
                        <span class="font-semibold text-sm uppercase">Items {{ order.products.length }}</span>
                        <span class="font-semibold text-sm">{{ orderTotal }} Tk.</span>
                    </div>
                    <div class="border-t mt-8">
                        <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>{{ orderTotal }} Tk.</span>
                        </div>
                        <button class='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full' @click='updateOrder'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Order } from '~/beans/order'

export default Vue.extend({
    auth: false,
    middleware: ['authGuard'],
    data: () => ({
        order: {} as Order,
        errors: [] as any[]
    }),
    async fetch() {
        this.order = await this.$axios.$get('orders/' + this.$route.params.id)
    },
    computed: {
        orderTotal() {
            const total = this.order.products.reduce((total, product) => total + (product.qty * product.price), 0);
            return Number(total).toFixed(2);
        }
    },
    methods: {
        updateOrder() {
            this.errors = [];
            this.$fetchState.pending = true;
            const products = this.order.products.map(p => ({id: p.id, quantity: p.qty}))
            this.$axios.$put('orders/' + this.order.id, { products })
                .then(() => {
                    this.$notifier.show("Order successfully updated", "Success !", "indigo")
                    this.$fetchState.pending = false;
                }).catch(e => {
                    if(e.response.status === 422) {
                        this.errors = Object.values(e.response.data.errors).flat();
                    } else {
                        this.$fetchState.error = e;
                    }
                    this.$fetchState.pending = false;
                })
        }
    }
})
</script>
