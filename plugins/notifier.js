export default ({ store }, inject) => {
    inject('notifier', {
        show (content = '', title = 'Alert !', colorClass = 'red') {
            store.commit('snackbar/showMessage', { title, content, colorClass })
        }
    })
}
