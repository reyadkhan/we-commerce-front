<template>
    <div class='border mb-2 p-4' :class='notification.isRead ? "bg-white" : ""'>
        <p class='font-bold text-gray-500'>{{ notification.title }}</p>
        <p class='mb-0'>{{ notification.details }}</p>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { Notification } from '~/beans/notification'

export default Vue.extend({
    props: {
        notification: {
            type: Object as PropType<Notification>,
            required: true
        }
    },
    mounted() {
        if( ! this.notification.isRead) {
            this.$axios.$patch("notifications/mark-as-read", {notifications: [this.notification]})
        }
    }
})
</script>
