<template>
    <ProductList :table-view='true' />
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    layout: "admin",
    middleware: "authAdmin"
})
</script>
