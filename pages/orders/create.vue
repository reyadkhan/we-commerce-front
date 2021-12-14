<template>
    <Cart/>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    auth: false,
    middleware: 'authGuard'
})
</script>
