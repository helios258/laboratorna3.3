<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold text-center justify-center text-primary mb-4">
          Вхід до кабінету
        </h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Ваш нікнейм</span>
            </label>
            <input
              v-model="nickname"
              type="text"
              placeholder="Наприклад: Олежка мандрівник"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full">Увійти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTravelerStore } from '../stores/travelerStore'

const nickname = ref('')
const route = useRoute()
const router = useRouter()
const store = useTravelerStore()

function getTargetPath(): string {
  const redirect = route.query.redirect
  if (
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('/login')
  ) {
    return redirect
  }
  return '/cabinet'
}

onMounted(() => {
  if (store.isAuthenticated) {
    router.push('/')
  }
})

function handleLogin() {
  if (!nickname.value.trim()) return
  store.login(nickname.value.trim())
  router.push(getTargetPath())
}
</script>