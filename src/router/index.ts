import { createRouter, createWebHistory} from 'vue-router'
import banners from '@/pages/banners.vue'
import tokenValid from '@/utility/useJwt'

const useAuth = import.meta.env.VITE_USE_AUTH

const routes = [
  {path: '/banners', 
   component: banners, 
   name: 'banners',
   meta: {requiresAuth: false}
  
  },
  {
    name: 'forms',
    component: () => import('@/pages/forms.vue'),
    path: '/forms',
    meta: {requiresAuth: false}
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})


router.beforeEach((to, from, next) => {

     if (!to.meta.requiresAuth || !useAuth) return next();
     
     if(!tokenValid()) return next('/');

     return next()
})

export default router
