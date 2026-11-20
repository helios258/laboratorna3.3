<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row gap-4 justify-between bg-base-100 p-4 rounded-box shadow">
      <input
        v-model="searchTag"
        type="text"
        placeholder="Фільтр за тегом (напр. Гори)..."
        class="input input-bordered w-full md:w-1/3"
      />
      <select v-model="sortOrder" class="select select-bordered w-full md:w-1/4">
        <option value="desc">Спершу нові</option>
        <option value="asc">Спершу старі</option>
      </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="trip in filteredTrips"
        :key="trip.id"
        class="card bg-base-100 shadow-xl border border-base-200"
      >
        <figure class="h-48 overflow-hidden">
          <img :src="trip.images[0]" alt="Trip image" class="w-full h-full object-cover" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-primary">{{ trip.title }}</h2>
          <p class="text-sm opacity-75">📍 {{ trip.location }} | 📅 {{ trip.date }}</p>
          <p>{{ trip.description }}</p>
          <div class="card-actions justify-end mt-4">
            <div v-for="tag in trip.tags" :key="tag" class="badge badge-outline">{{ tag }}</div>
            <RouterLink
              :to="{ name: 'trip-detail', params: { id: trip.id } }"
              class="btn btn-primary btn-sm ml-2"
            >
              Детальніше
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useTravelerStore } from '../stores/travelerStore'
import { useTripFilter } from '../composables/useTripFilter'

const store = useTravelerStore()
const { searchTag, sortOrder, filteredTrips } = useTripFilter(toRef(store, 'trips'))
</script>