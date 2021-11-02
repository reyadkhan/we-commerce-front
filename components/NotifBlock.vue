<template>
    <div v-if='$fetchState.pending' class='flex justify-center w-1/2 lg:w-full'>
        <FetchState :fetch-state='$fetchState' />
    </div>
    <div v-else class='w-1/2 lg:w-full'>
        <div
            class='border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6'>
            <div class='flex flex-col items-center'>
                <div class='flex-shrink pr-4'>
                    <div class='rounded-full p-3 bg-gray-300'><i
                        class='fas fa-envelope fa-fw fa-inverse text-indigo-500'></i></div>
                </div>
                <div class='flex-1'>
                    <h3 class='font-bold text-3xl'>{{ unreadNotif }} <span class='text-black'><i
                        class='fas fa-caret-down'></i></span></h3>
                    <h5 class='font-bold text-gray-500'>Unread Notification(s)</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        unreadNotif: 0
    }),
    async fetch() {
        const res = await this.$axios.$get('notifications/unread-count');
        this.unreadNotif = res.count;
    }
})
</script>
