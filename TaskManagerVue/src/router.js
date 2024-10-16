import Vue from "vue"
import VueRouter from "vue-router"
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Index from './components/dashboard/Index'

import Tasks from './components/dashboard/Tasks'
import addTask from './components/parts/task/Add'
import updateTask from './components/parts/task/Update'

import VueMeta from 'vue-meta'
import guest from './middleware/guest'
import auth from './middleware/auth'

import store from './store/user'
import middlewarePipeline from './middlewarePipeline'





Vue.use(VueMeta)
Vue.use(VueRouter)

export const router = new VueRouter({
  routes : [
    {
      path : '/login',
      component : Login,
      name : 'login',
      meta : {
        title : 'Login',
        middleware: [
          guest,
        ]
      }
    },
    {
      path : '/register',
      component : Register,
      name : 'register',
      meta : {
        title : 'Register',
        middleware: [
          guest,
        ]
      }
    },

    {
      path : '/',
      component : Dashboard,
      children: [
        {
          path: '/',
          component: Index,                    
          name : 'dashboard',
          meta : {
            title : 'Task Manager',
            middleware: [
              auth,
            ]
          },
        },

        {
          path: '/tasks',
          component: Tasks,                    
          name : 'Tasks',
          meta : {
            title : 'Tasks',
            middleware: [
              auth,
            ]
          },
        },
        {
          path: '/addTask',
          component: addTask,                    
          name : 'addTask',
          meta : {
            title : 'Add Task',
            middleware: [
              auth,
            ]
          },
        },
        {
          path: '/updateTask',
          component: updateTask,                    
          name : 'updateTask',
          meta : {
            title : 'Update Task',
            middleware: [
              auth,
            ]
          },
        },

      ],
    },
    {
      path : '*',
      redirect : '/'
    }
  ],
  mode : "history"
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})