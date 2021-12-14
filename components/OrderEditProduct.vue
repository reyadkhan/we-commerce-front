<template>
    <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div class="flex w-2/5"> <!-- product -->
            <div class="w-20">
                <img v-if='product.img' class="hover:grow hover:shadow-lg" :src="product.img" />
                <img v-else class="hover:grow hover:shadow-lg" src='@/assets/img/no-img.jpg' />
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
                <span class="font-bold text-sm">{{ product.name }}</span>
            </div>
        </div>
        <div class="flex justify-center w-1/5">
            <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" @click='removeQuantity'>
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input class="mx-2 border text-center w-8" type="text" :value="product.qty" readonly>

            <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" @click='addQuantity'>
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
        </div>
        <span class="text-center w-1/5 font-semibold text-sm">{{ product.price }} Tk.</span>
        <span class="text-center w-1/5 font-semibold text-sm">{{ totalPrice }} Tk.</span>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { Product } from '~/beans/product'

export default Vue.extend({
    props: {
        product: {
            type: Object as PropType<Product>,
            required: true
        }
    },
    computed: {
        totalPrice() {
            return Number(this.product.price * this.product.qty).toFixed(2);
        }
    },
    methods: {
        addQuantity() {
            this.$props.product.qty ++
        },
        removeQuantity() {
            if(this.$props.product.qty > 1) {
                this.$props.product.qty --
            }
        }
    }
})
</script>
