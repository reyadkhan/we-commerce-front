import configs from '~/nuxt.config'

export class Csrf {
    static async fetch(axios) {
        const url = configs.auth.strategies.laravelSanctum.url

        if(url) {
            await axios.$get("sanctum/csrf-cookie", {
                baseURL: url,
                withCredentials: true
            })
        }
    }
}
