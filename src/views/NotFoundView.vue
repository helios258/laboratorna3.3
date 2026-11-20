<template>
  <div class="text-center py-20 space-y-4">
    <h1 class="text-6xl font-black text-error">404</h1>
    <p class="text-xl">Сторінку не знайдено або запис не існує.</p>
    <RouterLink to="/" class="btn btn-primary">На головну</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>