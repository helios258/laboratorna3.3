<template>
  <div class="min-h-screen bg-base-300 text-base-content flex flex-col">
    <header class="bg-base-100 shadow-md w-full">
      <div class="navbar max-w-6xl mx-auto px-4 sm:px-8">
        <div class="flex-1">
          <RouterLink to="/" class="text-xl font-bold text-primary">Щоденник Мандрівника</RouterLink>
        </div>
        <div class="flex-none flex items-center gap-2 sm:gap-4">
          <RouterLink to="/" class="btn btn-ghost btn-sm hover:shadow-none">Стрічка</RouterLink>
          <RouterLink to="/cabinet" class="btn btn-ghost btn-sm hover:shadow-none">Особистий кабінет</RouterLink>

          <RouterLink v-if="!store.isAuthenticated" to="/login" class="btn btn-primary btn-sm">
            Увійти
          </RouterLink>

          <template v-else>
            <RouterLink to="/cabinet/profile" class="hidden sm:flex items-center gap-2 px-2">
              <div class="avatar">
                <div class="w-8 h-8 rounded-full ring ring-primary/50">
                  <img :src="store.profile.avatar" :alt="store.profile.name" />
                </div>
              </div>
              <span class="text-sm font-medium">{{ store.profile.name }}</span>
            </RouterLink>
            <button @click="handleLogout" class="btn btn-outline btn-error btn-sm">Вийти</button>
          </template>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useTravelerStore } from './stores/travelerStore'

const router = useRouter()
const store = useTravelerStore()

function handleLogout() {
  store.logout()
  router.push({ name: 'home' })
}
</script>