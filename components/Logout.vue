<template>
    <span v-if='home' class='border-b rounded bg-indigo-500 text-indigo-100 hover:text-white px-4 py-1 cursor-pointer font-bold' @click="logout()">Logout</span>
    <span v-else class='px-4 py-2 block text-gray-900 hover:bg-indigo-400 hover:text-white no-underline hover:no-underline cursor-pointer' @click='logout()'>Logout</span>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
    props: {
        home: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: false
        }
    },
    methods: {
        logout() {
            this.$auth.logout()
                .then(() => this.$router.push('/login'))
        }
    }
})
</script>
