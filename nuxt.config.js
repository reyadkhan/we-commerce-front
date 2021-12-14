export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'We Commerce',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~plugins/vee-validate.js', '~plugins/notifier.js', '~plugins/query-string.ts'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/cloudinary'
    ],
    build: {
      transpile: ['vee-validate']
    },
    axios: {
        baseURL: 'http://localhost:8000/api',
        credentials: true
    },

    router: {
        middleware: ['auth']
    },
    auth: {
        strategies: {
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: 'http://localhost:8000',
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post' },
                    logout: { url: '/api/auth/logout', method: 'post'},
                    user: { url: '/api/auth/user', method: 'get' }
                }
            }
        },
        redirect: {
            home: false,
            logout: '/login'
        }
    },
    cloudinary: {
        cloudName: 'reyad-khan',
        api_key: '485869365976528',
        secure: false
    }
}
