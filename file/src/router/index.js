import { createRouter, createWebHistory } from 'vue-router'
import pageDay from '@/page/pageDay.vue';
import calendarPage from '@/page/calendarPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/day/:id',
      component:pageDay
    },
    {
      path:'/',
      component:calendarPage
    }
  ]
})

export default router
