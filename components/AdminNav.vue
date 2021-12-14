<template>
    <div id='sidebar' class='h-screen w-16 menu bg-white text-white px-4 flex items-center nunito static fixed shadow'>

        <ul class='list-reset '>
            <li class='my-2 md:my-0'>
                <NuxtLink to='/'
                   class='block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400' exact>
                    <i class='fas fa-home fa-fw mr-3'></i><span
                    class='w-full inline-block pb-1 md:pb-0 text-sm'>Home</span>
                </NuxtLink>
            </li>
            <li class='my-2 md:my-0 '>
                <NuxtLink to='/admin/products'
                   class='block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400'>
                    <i class='fas fa-list fa-fw mr-3'></i><span
                    class='w-full inline-block pb-1 md:pb-0 text-sm'>Products</span>
                </NuxtLink>
            </li>
            <li class='my-2 md:my-0 '>
                <NuxtLink to='/admin/orders'
                          class='block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400'>
                    <i class='fas fa-shopping-cart fa-fw mr-3'></i><span
                    class='w-full inline-block pb-1 md:pb-0 text-sm'>Orders</span>
                </NuxtLink>
            </li>
            <li class='my-2 md:my-0 '>
                <NuxtLink to='/admin/notifications'
                          class='block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400'>
                    <i class='fas fa-bell fa-fw mr-3'></i><span
                    class='w-full inline-block pb-1 md:pb-0 text-sm'>Notifications</span>
                </NuxtLink>
            </li>
        </ul>

    </div>
</template>

<style scoped>
#sidebar {
    transition: ease-in-out all .3s;
    z-index: 9999;
}

#sidebar span {
    opacity: 0;
    position: absolute;
    transition: ease-in-out all .1s;
}

#sidebar:hover {
    width: 150px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

#sidebar:hover span {
    opacity: 1;
}

.nuxt-link-active {
    color: rgb(129, 140, 248);
}
</style>
