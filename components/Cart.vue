<template>
    <div class="container mx-auto mt-10">
        <div class="flex shadow-md my-10">
            <div class="w-3/4 bg-white px-10 py-10">
                <div class="flex justify-between border-b pb-8">
                    <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                    <h2 class="font-semibold text-2xl">{{ cartCount }} Items</h2>
                </div>
                <FetchState v-if=' ! mounted' :fetch-state='{pending: true, error: false}' class='mt-4' />
                <div v-else-if='cartCount'>
                    <div class="flex mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    <CartProduct v-for='cartProduct in cartProducts' :key='cartProduct.product.id' :cartProduct='cartProduct' />
                </div>
                <h5 v-else class='mt-5'>Sorry! There is no product in the cart. Please add product from <NuxtLink to='/' class='text-indigo-600'>here</NuxtLink></h5>

                <NuxtLink v-if='$route.name === "carts"' to="/" class="flex w-max font-semibold text-indigo-600 text-sm mt-10">

                    <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                    Continue Shopping
                </NuxtLink>
            </div>

            <div v-if='mounted' id="summary" class="w-1/4 px-8 py-10">
                <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div class="flex justify-between mt-10 mb-5">
                    <span class="font-semibold text-sm uppercase">Items {{ cartCount }}</span>
                    <span class="font-semibold text-sm">{{ cartTotal }} Tk.</span>
                </div>
                <div class="border-t mt-8">
                    <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span>{{ cartTotal }} Tk.</span>
                    </div>
                    <NuxtLink v-if="$route.name === 'carts'" to='/orders/create' class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full inline-block text-center">Checkout</NuxtLink>
                    <button v-else class='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full' @click='createOrder'>Proceed</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { CartProduct } from '~/beans/cartProduct'

export default Vue.extend({
    auth: false,
    data: () => ({
        mounted: false
    }),
    computed: {
        ...mapGetters(['cartCount']),
        cartTotal(): string {
            const total = this.cartProducts.reduce((total, cp) => total + (cp.quantity * cp.product.price), 0);
            return Number(total).toFixed(2);
        },
        cartProducts(): CartProduct[] {
            return this.$store.getters.getCartProducts
        }
    },
    mounted() {
        this.mounted = true;
    },
    methods: {
        createOrder() {
            if(this.$auth.loggedIn) {
                this.mounted = false;
                const products = [] as Object[];
                this.cartProducts.forEach(cp => products.push({id: cp.product.id, quantity: cp.quantity}))
                this.$axios.post("/orders", { products })
                    .then(() => {
                        this.$notifier.show("Order successfully created", 'Success !', 'indigo');
                        this.$store.dispatch('deleteCart');
                        this.$router.push('/orders')
                    })
                    .catch(e => {
                        this.$notifier.show("Failed to create order. Status: " + e.response.status)
                        this.mounted = true;
                    });
            } else {
                this.$router.push('/login');
            }
        }
    }
})
</script>
