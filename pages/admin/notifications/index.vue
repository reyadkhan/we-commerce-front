<template>
    <div class='ml-14 mt-14'>
        <h3 class='mb-4 text-lg'>Notifications</h3>
        <FetchState v-if='$fetchState.pending || $fetchState.error' :fetch-state='$fetchState' class='mt-5' />
        <Notification v-else v-for='notification in notifications' :key='notification.id' :notification='notification'/>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Notification } from '~/beans/notification'

export default Vue.extend({
    layout: 'admin',
    auth: false,
    middleware: ['authGuard', 'authAdmin'],
    data: () => ({
        notifications: [] as Notification[]
    }),
    async fetch() {
        const pageable = await this.$axios.$get('/notifications') // todo handle pagination
        this.notifications = pageable.data;
    }
})
</script>
