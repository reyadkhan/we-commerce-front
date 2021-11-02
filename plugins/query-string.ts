import Vue  from 'vue'
import VueRouter from 'vue-router'

declare module 'vue/types/vue' {
    interface Vue {
        $queryString(router: VueRouter): string
    }
}

Vue.prototype.$queryString = (router: VueRouter) => {
    let queryString = '';
    Object.entries(router.currentRoute.query)
        .forEach(([key, value]) => {
        if(queryString) {
            queryString += '&'
        } else {
            queryString += '?'
        }
        queryString += key + '=' + value;
    })
    return queryString;
}
