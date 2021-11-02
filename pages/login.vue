<template>
    <div class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-lg mx-auto mt-10'>
        <ValidationObserver v-slot='{ handleSubmit }'>
            <div class='mb-4'>
                <label class='block text-grey-darker text-sm font-bold mb-2' for='username'>
                    Username
                </label>
                <ValidationProvider v-slot=' { errors }' rules='required|email' name='E-mail'>
                    <input id='username' v-model='email'
                           class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='text'
                           placeholder='Username' />
                    <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                </ValidationProvider>
            </div>

            <div class='mb-6'>
                <label class='block text-grey-darker text-sm font-bold mb-2' for='password'>
                    Password
                </label>
                <ValidationProvider v-slot='{ errors }' rules='required'>
                    <input id='password' v-model='password'
                           class='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
                           type='password' placeholder='**************'>
                    <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                </ValidationProvider>
                <p v-show='error' class='text-red-400 text-md'>{{ error }}</p>
            </div>
            <div class='flex items-center justify-between'>
                <button class='bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded' type='button'
                        @click.prevent='handleSubmit(login)'>
                    Sign In
                </button>
            </div>
        </ValidationObserver>
        <p class='text-md text-blue-500 italic mt-5'>Welcome to We-Commerce. Regiser <NuxtLink to='/register' class='underline font-bold'>here</NuxtLink></p>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default Vue.extend({
    components: {
        ValidationProvider,
        ValidationObserver
    },
    middleware: "redirectIfAuthenticated",
    data: () => ({
        email: '' as string,
        password: '' as string,
        error: null as string|null
    }),
    methods: {
        login(): void {
            this.error = null;
            this.$auth.loginWith('laravelSanctum', {
                data: {
                    email: this.email,
                    password: this.password
                }
            }).then(() => {
                const user = this.$auth.user;
                if(user.isAdmin) {
                    this.$router.replace('/admin/products')
                } else {
                    this.$router.replace('/')
                }
            }).catch(() => {
                this.error = "Authentication failed."
            })
        }
    }
})
</script>
