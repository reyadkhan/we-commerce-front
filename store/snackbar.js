export const state = () => ({
    content: '',
    colorClass: '',
    title: ''
})

export const mutations = {
    showMessage (state, payload) {
        state.content = payload.content
        state.colorClass = payload.colorClass
        state.title = payload.title
    }
}
