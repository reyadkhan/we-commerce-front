import { Auth as NuxtAuth } from '@nuxtjs/auth-next'

export interface User {
    id: number,
    firstName: string,
    lastName: string|null,
    fullName: string,
    email: string,
    isAdmin: boolean
}

declare module 'vue/types/vue' {
    interface Auth extends NuxtAuth {
        user: User & typeof NuxtAuth.prototype.user
    }
}
