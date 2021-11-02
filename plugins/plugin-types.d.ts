import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $notifier: {
            show(content: string, title?: string, colorClass?: string): void
        },
        $cloudinary: {
            upload(path: string, options: {}, callback: Function): void
        }
    }
}
