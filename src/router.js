import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Championships from './views/championships/Championships.vue'
import CreateChampionship from './views/championships/CreateChampionship.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Teams from './views/teams/Teams.vue'

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
      component: Championships,
      children: [
        // {
        //   path: 'create',
        //   name: 'createChampionship',
        //   component: CreateChampionship
        // }
      ]
    },
    {
      path: 'create',
      name: 'createChampionship',
      component: CreateChampionship
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    }
  ]
})
