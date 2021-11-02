<template>
    <div class='flex h-screen bg-gray-100 font-sans'>
        <!-- Side bar-->
        <AdminNav />

        <div class='flex flex-row flex-wrap flex-1 flex-grow content-start pl-16'>

            <div class='h-40 lg:h-20 w-full flex flex-wrap'>
                <nav class='bg-gray-200 w-full lg:max-w-sm flex items-center justify-center border-b-1 border-gray-300 order-2 lg:order-1'>
                    <NuxtLink to='/'>
                        <span class='font-bold text-3xl'>We Commerce</span>
                    </NuxtLink>
                </nav>
                <nav class='bg-gray-100 w-auto flex-1 border-b-1 border-gray-300 order-1 lg:order-2'>

                    <div class='flex h-full justify-between items-center'>

                        <!--Search-->
                        <div class='relative w-full max-w-3xl px-6'>
                            <div class='absolute h-10 mt-1 left-0 top-0 flex items-center pl-10'>
                                <svg class='h-4 w-4 fill-current text-gray-600' xmlns='http://www.w3.org/2000/svg'
                                     viewBox='0 0 20 20'>
                                    <path
                                        d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
                                </svg>
                            </div>

                            <input id='search-toggle' type='search' placeholder='search'
                                   class='block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md text-gray-700 font-bold rounded-full pl-12 pr-4 py-3'
                                   onkeyup='updateSearchResults(this.value);'>

                        </div>
                        <!-- / Search-->

                        <!--Menu-->

                        <div class='flex relative inline-block pr-6'>

                            <div class='relative text-sm dropdown py-3'>
                                <button id='userButton' class='flex items-center focus:outline-none mr-3'>
                                    <img class='w-8 h-8 rounded-full mr-4' src='@/assets/img/default-avatar.png'
                                         alt='Avatar of User'> <span class='hidden md:inline-block'>Hi, {{ $auth.user.firstName }} </span>
                                    <svg class='pl-2 h-2' version='1.1' xmlns='http://www.w3.org/2000/svg'
                                         viewBox='0 0 129 129' xmlns:xlink='http://www.w3.org/1999/xlink'
                                         enable-background='new 0 0 129 129'>
                                        <g>
                                            <path
                                                d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'></path>
                                        </g>
                                    </svg>
                                </button>
                                <div id='userMenu'
                                     class='dropdown-menu hidden bg-white nunito rounded shadow-md mt-2 absolute mt-12 -top-0.5 right-0 min-w-full h-auto z-30'>
                                    <ul class='list-reset'>
                                        <li>
                                            <Logout />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>

                </nav>
            </div>

            <!--Dash Content -->
            <Dashboard />

            <!--Graph Content -->
            <div id='main-content' class='w-full flex-1'>
                <Snackbar />
                <Nuxt />
            </div>

        </div>
    </div>
</template>

<script lang='ts'>

import Vue from 'vue'
import AdminNav from '~/components/AdminNav.vue'

export default Vue.extend({
    components: { AdminNav },
    head: {
        link: [
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Nunito:400,700,800",
            },
            {
                rel: "stylesheet",
                href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            }
        ]
    }
})
</script>

<style scoped>
.nunito {
    font-family: 'nunito', font-sans, serif;
}

.border-b-1 {
    border-bottom-width: 1px;
}

.border-l-1 {
    border-left-width: 1px;
}

hover\:border-none:hover {
    border-style: none;
}

.dropdown:hover .dropdown-menu {
    display: block;
}
</style>
