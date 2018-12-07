import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Championships from './views/championships/Championships.vue'
import CreateChampionship from './views/championships/CreateChampionship.vue'
import Register from './views/user/Register.vue'
import Login from './views/user/Login.vue'
import Teams from './views/team/Teams.vue'
import UserProfile from './views/user/UserProfile.vue'
import Users from './views/user/Users.vue'
import NotFound from './views/common/NotFound.vue'
import Tracks from './views/tracks/Tracks.vue'
import Track from './views/tracks/Track.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        breadcrumbs: [{ name: 'Home' }]
      }
    },
    {
      path: '/championships',
      name: 'championships',
      component: Championships,
      meta: {
        breadcrumbs: [{ name: 'Championships' }]
      }
    },
    {
      path: 'create',
      name: 'createChampionship',
      component: CreateChampionship
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        breadcrumbs: [
          {
            name: 'Register'
          }
        ]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        breadcrumbs: [
          {
            name: 'Login'
          }
        ]
      }
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams,
      meta: {
        breadcrumbs: [
          {
            name: 'Teams'
          }
        ]
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        breadcrumbs: [
          {
            name: 'Users'
          }
        ]
      }
    },
    {
      path: '/user_:id',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        breadcrumbs: [
          {
            name: 'User'
          }
        ]
      }
    },
    {
      path: '/tracks',
      name: 'Tracks',
      component: Tracks,
      meta: {
        breadcrumbs: [
          {
            name: 'Tracks'
          }
        ]
      }
    },
    {
      path: '/tracks/circuit_:id',
      name: 'Track',
      component: Track,
      meta: {
        breadcrumbs: [
          {
            name: 'Tracks',
            path: '/tracks'
          },
          {
            name: 'Circuit'
          }
        ]
      }
    },
    {
      path: '/*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
