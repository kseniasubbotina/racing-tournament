import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Championships from './views/championships/Championships.vue'
import CreateChampionship from './views/championships/CreateChampionship.vue'
import Championship from './views/championships/Championship.vue'
import Register from './views/user/Register.vue'
import Login from './views/user/Login.vue'
import Teams from './views/teams/Teams.vue'
import UserProfile from './views/user/UserProfile.vue'
import Users from './views/user/Users.vue'
import NotFound from './views/common/NotFound.vue'
import Tracks from './views/tracks/Tracks.vue'
import Track from './views/tracks/Track.vue'
import Games from './views/games/Games.vue'
import Game from './views/games/Game.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
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
      path: '/championships/:id',
      name: 'Championship',
      component: Championship,
      meta: {
        breadcrumbs: [
          { name: 'Championships', path: '/championships' },
          { name: 'Championship' }
        ]
      }
    },
    {
      path: '/create',
      name: 'createChampionship',
      component: CreateChampionship,
      meta: {
        breadcrumbs: [
          { name: 'Championships', path: '/championships' },
          { name: 'Create Championship' }
        ]
      }
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
      path: '/games',
      name: 'Games',
      component: Games,
      meta: {
        breadcrumbs: [
          {
            name: 'Games',
            path: '/games'
          }
        ]
      }
    },
    {
      path: '/games/:id',
      name: 'Game',
      component: Game,
      meta: {
        breadcrumbs: [
          {
            name: 'Games',
            path: '/games'
          },
          {
            name: 'Game'
          }
        ]
      }
    },
    {
      path: '/*',
      name: 'not-found',
      component: NotFound,
      meta: {
        breadcrumbs: [{ name: 'Not Found' }]
      }
    }
  ]
})

export default router
