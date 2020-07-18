import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listiid: null,
        bookList: []
    },
    mutations: {
        listiid(state, url) {
            state.listiid = url
        },
        bookR(state, book) {
            state.bookList.push_unique(book)
            localStorage.setItem("bookList", JSON.stringify(state.bookList))
        },
    },
    actions: {

    },
    modules: {}
})