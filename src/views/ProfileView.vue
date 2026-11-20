<template>
  <form @submit.prevent="saveProfile" class="space-y-4">
    <h2 class="text-xl font-bold text-secondary">Профіль мандрівника</h2>
    <div>
      <label class="label">Ім'я</label>
      <input v-model="form.name" type="text" required class="input input-bordered w-full" />
    </div>
    <div>
      <label class="label">Аватар URL</label>
      <input v-model="form.avatar" type="url" required class="input input-bordered w-full" />
    </div>
    <div>
      <label class="label">Біографія</label>
      <textarea v-model="form.bio" required class="textarea textarea-bordered w-full"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Оновити профіль</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useTravelerStore } from '../stores/travelerStore'

const store = useTravelerStore()
const form = reactive({ ...store.profile })

function saveProfile() {
  store.updateProfile({ ...form })
  alert('Профіль успішно оновлено!')
}
</script>