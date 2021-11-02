<template>
    <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
            <img v-if='product.img' class="hover:grow hover:shadow-lg" :src="product.img" />
            <img v-else class="hover:grow hover:shadow-lg" src='@/assets/img/no-img.jpg' />
            <div class="pt-3 flex items-center justify-between">
                <p>{{ product.name }}</p>
            </div>
            <p v-if='product.qty' class="pt-1 text-gray-900">{{ product.price }} Tk.</p>
            <p v-else class="pt-1 text-red-300 font-bold">Out of Stock</p>
        </a>
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
    }
})
</script>
