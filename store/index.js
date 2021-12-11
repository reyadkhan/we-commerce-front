import { Cart } from '~/helpers/app-helpers'

export const state = () => ({
    search: '',
    cart: []
})

export const actions = {
    initCart({ commit }) {
        commit('initCart')
    },
    addCart({ commit }, product) {
        commit('addCart', product)
    },
    addCartQuantity({ commit }, productId) {
        commit('addCartQuantity', productId)
    },
    removeCartQuantity({ commit }, productId) {
        commit('removeCartQuantity', productId)
    },
    removeCartItem({ commit }, productId) {
        commit('removeCartItem', productId);
    },
    deleteCart({ commit }) {
        commit('deleteCart');
    }
}

export const mutations = {
    PRODUCT_SEARCH(state, payload) {
        state.search = payload;
    },
    initCart(state) {
        state.cart = Cart.get();
    },
    addCart(state, product) {
        if( ! Cart.exists(product.id)) {
            Cart.add(product);
        } else {
            Cart.addQuantity(product.id, 1)
        }
        state.cart = Cart.get();
    },
    addCartQuantity(state, productId) {
        Cart.addQuantity(productId, 1);
        state.cart = Cart.get();
    },
    removeCartQuantity(state, productId) {
        Cart.addQuantity(productId, -1);
        state.cart = Cart.get();
    },
    removeCartItem(state, productId) {
        Cart.removeItem(productId);
        state.cart = Cart.get();
    },
    deleteCart(state) {
        Cart.destroy();
        state.cart = [];
    }
}

export const getters = {
    cartCount: state => state.cart.length,
    getCartProducts: state => state.cart
}
