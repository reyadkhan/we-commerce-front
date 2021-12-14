<template>
    <OrderList />
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    layout: 'admin',
    auth: false,
    middleware: ['authGuard', 'authAdmin']
})
</script>
