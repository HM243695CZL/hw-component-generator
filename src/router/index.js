import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Preview from '../views/Preview.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/preview',
        name: 'Preview',
        component: Preview
    }
]

const router = new VueRouter({
    routes
})

export default router
