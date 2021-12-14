<template>
    <OrderDetails />
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    layout: 'admin',
    auth: false,
    middleware: ['authAdmin', 'authGuard']
})
</script>
