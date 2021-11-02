<template>
    <div class='relative w-full max-w-3xl px-6'>
        <div class='absolute h-10 mt-1 left-0 top-0 flex items-center pl-10'>
            <svg class='h-4 w-4 fill-current text-gray-600' xmlns='http://www.w3.org/2000/svg'
                 viewBox='0 0 20 20'>
                <path
                    d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
            </svg>
        </div>

        <input id='search-toggle' v-model='search' type='search' placeholder='search'
               class='block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md text-gray-700 font-bold rounded-full pl-12 pr-4 py-3'>

    </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        search: '' as string
    }),
    watch: {
        search(value: string) {
            this.$emit('search', value)
        }
    }
})
</script>
