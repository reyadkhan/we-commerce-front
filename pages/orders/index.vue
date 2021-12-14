<template>
    <div class='container mx-auto'>
        <p class='text-3xl my-5'>Order List</p>
        <OrderList />
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    auth: false,
    middleware: 'authGuard'
})
</script>
