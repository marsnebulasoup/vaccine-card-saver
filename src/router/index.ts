import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Editor from '../views/Editor.vue'
import Preview from '../views/Preview.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      transition: {
        leaving: 'push-to-left',
        entering: 'push-to-left'
      }
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    props: route => ({ cardId: route.query.cardId }),
    meta: {
      transition: { // TODO: Add a setting to disable page transitions to improve performance
        leaving: 'push-to-left',
        entering: 'push-to-left'
      }
    }
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview,
    props: true,
    meta: {
      transition: {
        leaving: 'push-to-left',
        entering: 'push-to-left'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
