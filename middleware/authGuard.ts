import { Middleware } from '@nuxt/types'

const authGuard: Middleware = ({ $auth, route, redirect }) => {
    if (route.path !== '/login') {
        const REDIRECT_URL = '/login?redirect=' + route.path
        if ( ! $auth.loggedIn) {
            redirect(REDIRECT_URL)
        }
    }
}
export default authGuard;
