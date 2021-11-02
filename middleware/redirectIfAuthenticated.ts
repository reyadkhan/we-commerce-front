import { Middleware } from '@nuxt/types'

const redirectIfAuthenticated: Middleware = ({ $auth, redirect }) => {
    if($auth.loggedIn) {
        if($auth.$state.user.isAdmin) {
            return redirect('/admin/products')
        }
        return redirect('/')
    }
}

export default redirectIfAuthenticated
