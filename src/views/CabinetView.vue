<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-center gap-4 bg-base-100 p-6 rounded-box shadow-md">
      <div class="avatar">
        <div class="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img :src="store.profile.avatar" :alt="store.profile.name" />
        </div>
      </div>
      <div class="text-center sm:text-left">
        <h1 class="text-2xl font-bold text-primary">{{ store.profile.name }}</h1>
        <p class="text-sm opacity-80 mt-1">{{ store.profile.bio }}</p>
      </div>
    </div>

    <div role="tablist" class="tabs tabs-lifted tabs-lg">
      <RouterLink :to="{ name: 'cabinet-new' }" role="tab" class="tab">
        Керування подорожами
      </RouterLink>
      <RouterLink :to="{ name: 'cabinet-profile' }" role="tab" class="tab">
        Редагувати профіль
      </RouterLink>
    </div>

    <div class="bg-base-100 p-6 rounded-box shadow-xl">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTravelerStore } from '../stores/travelerStore'

const store = useTravelerStore()
</script>