<template>
    <div class="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        <Snackbar />
        <Nav />
        <Nuxt />
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    head: {
        link: [
            {
                rel: "stylesheet",
                href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            }
        ]
    }
})
</script>

