import { createRouter, createWebHistory } from 'vue-router'
import { useTravelerStore } from '../stores/travelerStore'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'btn-active font-bold text-primary',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/trips/:id',
      name: 'trip-detail',
      component: () => import('../views/TripDetailView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('../views/CabinetView.vue'),
      meta: { requiresAuth: true },
      redirect: '/cabinet/new-trip',
      children: [
        {
          path: 'new-trip',
          name: 'cabinet-new',
          component: () => import('../views/NewTripView.vue'),
        },
        {
          path: 'profile',
          name: 'cabinet-profile',
          component: () => import('../views/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const store = useTravelerStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router