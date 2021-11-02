<template>
    <div class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-lg mx-auto mt-10'>
        <ValidationObserver ref='form' v-slot='{ handleSubmit }'>
            <form @submit.prevent='handleSubmit(register)'>
                <p v-show='error' class='text-red-400 text-md'>{{ error }}</p>
                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='firstName'>
                        First Name
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='firstName' rules='required|min:2|max:50' name='First name'>
                        <input id='firstName' v-model='firstName'
                               class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='text'
                               placeholder='First name' />
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='lastName'>
                        Last Name
                    </label>
                    <ValidationProvider v-slot='{ errors }' rules='required|min:2|max:50' name='Last name'>
                        <input id='lastName' v-model='lastName'
                               class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='text'
                               placeholder='Last name' />
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='email'>
                        E-mail
                    </label>
                    <ValidationProvider v-slot=' { errors }' vid='email' rules='required|email|max:100' name='E-mail'>
                        <input id='email' v-model='email' name='email'
                               class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='text'
                               placeholder='Username' />
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-6'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='password'>
                        Password
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='password' rules='required|confirmed:confirmation|min:6' name='Password'>
                        <input id='password' v-model='password'
                               class='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
                               type='password' placeholder='**************'>
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-6'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='confirmP'>
                        Confirm Password
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='confirmation'>
                        <input id='confirmP' v-model='confirmPass'
                               class='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
                               type='password' placeholder='**************'>
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='flex items-center justify-between'>
                    <button class='bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded' type='submit'>
                        Register
                    </button>
                </div>
            </form>
        </ValidationObserver>
        <p class='text-md text-blue-500 italic mt-5'>Already registered. Login <NuxtLink to='/login' class='underline font-bold'>here</NuxtLink></p>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import configs from '~/nuxt.config'

interface Form extends Element {
    setErrors(errors: object): void
}

interface RegisterData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export default Vue.extend({
    components: {
        ValidationObserver,
        ValidationProvider
    },
    auth: 'guest',
    data: () => ({
        firstName: '' as string,
        lastName: '' as string,
        email: '' as string,
        password: '' as string,
        confirmPass: '' as string,
        error: null as string|null
    }),
    methods: {
        register(): void {
            const data: RegisterData = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            }
            const sanctumUrl =  configs.auth.strategies.laravelSanctum.url;
            const res = this.$axios.get('sanctum/csrf-cookie', {baseURL: sanctumUrl})
                .then(async () => {
                    return await this.$axios.post('users', data);
                })
            res.then(() => {
                this.$router.push('/login');
            })
            res.catch(e => {
                if(e.response && e.response.status === 422) {
                    (this.$refs.form as Form).setErrors(e.response.data.errors);
                } else if(e.response && e.response.data && e.response.data.message) {
                    this.error = e.response.data.message;
                } else {
                    this.error = "Failed to process the request."
                }
            })
        }
    }
})
</script>
