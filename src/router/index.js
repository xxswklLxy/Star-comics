import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

const HomePage = () =>
    import ('@/views/HomePage/HomePage.vue')
const Cartoon = () =>
    import ('@/views/Cartoon/Cartoon.vue')
const Movie = () =>
    import ('@/views/iMovie/Movie.vue')
const Fiction = () =>
    import ('@/views/Fiction/Fiction.vue')
const Detail = () =>
    import ('@/views/CartoonDetails.vue')
const ReadComics = () =>
    import ('@/views/ReadComics.vue')

Vue.use(VueRouter)

const routes = [
    { path: '', redirect: '/homepage' },
    {
        path: '/homepage',
        name: 'homepage',
        component: HomePage,

    },
    {
        path: '/cartoon',
        name: 'cartoon',

        component: Cartoon,

    },
    {
        path: '/movie',
        name: 'movie',
        component: Movie,
    },
    {
        path: '/fiction',
        name: 'fiction',
        component: Fiction,
    },
    {
        path: '/detail/:iid',
        name: 'detail',
        component: Detail,
    },
    {
        path: '/readcomics/:iid',
        name: 'readcomics',
        component: ReadComics
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router