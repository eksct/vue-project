import { createRouter, createWebHistory } from 'vue-router'
const routes = [
      {
        path: '/post/:topDir/:dir/:id',
        component:() =>import("@/views/PostPage/index.vue")
      },
      // {
      //   path: '/about',
      //   name: 'about', .
      //   component: () => import(''),
      // },
    ]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
