import { createRouter, createWebHistory } from 'vue-router'
import banners from '@/pages/banners.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{path: '/banners', component: banners, name: 'banners'}],
})


export default router
