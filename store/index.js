export const state = () => ({
    search: '',
})

export const mutations = {
    PRODUCT_SEARCH(state, payload) {
        state.search = payload;
    }
}
