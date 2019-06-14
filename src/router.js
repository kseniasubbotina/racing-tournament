import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        breadcrumbs: [{ name: 'Home' }]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        breadcrumbs: [{ name: 'About' }]
      }
    },
    {
      path: '/championships',
      name: 'championships',
      component: () => import('./views/championships/Championships.vue'),
      meta: {
        breadcrumbs: [{ name: 'Championships' }]
      }
    },
    {
      path: '/championships/:id',
      name: 'Championship',
      component: () => import('./views/championships/Championship.vue'),
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
      component: () => import('./views/championships/CreateChampionship.vue'),
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
      component: () => import('./views/user/Register.vue'),
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
      component: () => import('./views/user/Login.vue'),
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
      component: () => import('./views/teams/Teams.vue'),
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
      component: () => import('./views/user/Users.vue'),
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
      component: () => import('./views/user/UserProfile.vue'),
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
      component: () => import('./views/tracks/Tracks.vue'),
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
      component: () => import('./views/tracks/Track.vue'),
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
      component: () => import('./views/games/Games.vue'),
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
      component: () => import('./views/games/Game.vue'),
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
      component: () => import('./views/common/NotFound.vue'),
      meta: {
        breadcrumbs: [{ name: 'Not Found' }]
      }
    }
  ]
})

export default router
