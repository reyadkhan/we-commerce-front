<template>
    <FetchState v-if='$fetchState.error || $fetchState.pending' :fetch-state='$fetchState' />
    <ProductForm v-else :product='product' />
</template>

<script lang='ts'>
import Vue from 'vue'
import { Product } from '~/beans/product'

export default Vue.extend({
    layout: 'admin',
    middleware: 'authAdmin',
    data: () => ({
        product: {} as Product
    }),
    async fetch() {
        this.product = await this.$axios.$get("/products/" + this.$route.params.id)
    }
})
</script>
