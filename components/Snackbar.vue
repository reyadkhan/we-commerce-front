<template>
    <div v-show='show' class='relative z-50'>
        <div :class='"bg-" + colorClass + "-100 border-" + colorClass + "-400 text-" + colorClass + "-700"' class='absolute top-0 left-1/2 transform -translate-x-1/2 border px-4 py-3 rounded container mx-auto my-3 max-w-screen-sm' role='alert'>
            <strong class='font-bold'>{{ title }}</strong>
            <span class='block sm:inline'>{{ message }}</span>
            <span class='absolute top-0 bottom-0 right-0 px-4 py-3' @click='show = false'>
            <svg :class='"text-" + colorClass + "-500"' class='fill-current h-6 w-6' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><title>Close</title><path
                d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z'/></svg>
        </span>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        show: false as boolean,
        message: '' as string,
        title: '' as string,
        colorClass: '' as string
    }),

    created(): void {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'snackbar/showMessage') {
                this.title = state.snackbar.title
                this.message = state.snackbar.content
                this.colorClass = state.snackbar.colorClass
                this.show = true
            }
        })
    }
})
</script>
