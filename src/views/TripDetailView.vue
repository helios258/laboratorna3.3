<template>
  <div v-if="trip" class="space-y-6">
    <div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
      <figure v-if="trip.images.length" class="max-h-96 overflow-hidden">
        <img :src="trip.images[0]" :alt="trip.title" class="w-full object-cover" />
      </figure>
      <div class="card-body space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h1 class="text-3xl font-bold text-primary">{{ trip.title }}</h1>
          <RouterLink to="/" class="btn btn-outline btn-sm">← Назад до стрічки</RouterLink>
        </div>

        <p class="text-sm opacity-75">📍 {{ trip.location }} | 📅 {{ trip.date }}</p>

        <p class="text-base leading-relaxed whitespace-pre-line">
          {{ trip.fullDescription || trip.description }}
        </p>

        <div v-if="trip.places.length" class="space-y-2 pt-2">
          <h2 class="text-sm font-semibold uppercase tracking-wide opacity-70">Відвідані місця</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="place in trip.places" :key="place" class="badge badge-secondary badge-outline">
              {{ place }}
            </span>
          </div>
        </div>

        <div v-if="trip.tags.length" class="flex flex-wrap gap-2 pt-2">
          <span v-for="tag in trip.tags" :key="tag" class="badge badge-outline">
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useTravelerStore } from '../stores/travelerStore'

const route = useRoute()
const router = useRouter()
const store = useTravelerStore()

const tripId = computed(() => String(route.params.id ?? ''))
const trip = computed(() => store.trips.find((item) => item.id === tripId.value))

watch(
  trip,
  (currentTrip) => {
    if (!currentTrip) {
      router.replace({ name: 'not-found' })
    }
  },
  { immediate: true }
)
</script>