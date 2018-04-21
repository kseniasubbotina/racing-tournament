import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Championships from './views/Championships.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/championships',
      name: 'championships',
      component: Championships
    }
  ]
})
