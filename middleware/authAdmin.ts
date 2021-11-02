import { Middleware } from '@nuxt/types'

const authAdmin: Middleware = ({ $auth, app, redirect }) => {
    if( ! $auth.loggedIn) {
        redirect('/login')
    } else if( ! $auth.$state.user.isAdmin) {
        app.$notifier.show("You are not authorized for this request.")
        redirect('/')
    }
}

export default authAdmin
