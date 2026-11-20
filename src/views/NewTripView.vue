<template>
  <div class="space-y-8">
    <form @submit.prevent="submitTrip" class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-secondary">
          {{ editingId ? 'Редагування подорожі' : 'Нова подорож' }}
        </h2>
        <button v-if="editingId" type="button" @click="resetForm" class="btn btn-ghost btn-sm">
          Скасувати редагування
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="form.title"
          type="text"
          placeholder="Назва"
          required
          class="input input-bordered w-full"
        />
        <input
          v-model="form.location"
          type="text"
          placeholder="Країна / Місто"
          required
          class="input input-bordered w-full"
        />
        <input
          v-model="form.date"
          type="date"
          required
          class="input input-bordered w-full"
        />
        <input
          v-model="form.tagsInput"
          type="text"
          placeholder="Теги (через кому)"
          required
          class="input input-bordered w-full"
        />
      </div>

      <textarea
        v-model="form.description"
        placeholder="Короткий опис"
        required
        class="textarea textarea-bordered w-full"
      ></textarea>
      <textarea
        v-model="form.fullDescription"
        placeholder="Повний текст"
        required
        class="textarea textarea-bordered w-full"
      ></textarea>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="form.image"
          type="url"
          placeholder="URL зображення"
          required
          class="input input-bordered w-full"
        />
        <input
          v-model="form.placesInput"
          type="text"
          placeholder="Відвідані місця (через кому)"
          class="input input-bordered w-full"
        />
      </div>

      <button type="submit" class="btn" :class="editingId ? 'btn-warning' : 'btn-success'">
        {{ editingId ? 'Зберегти зміни' : 'Додати подорож' }}
      </button>
    </form>

    <div class="divider"></div>

    <div class="space-y-3">
      <h3 class="text-lg font-bold">Мої записи ({{ store.trips.length }})</h3>
      <div v-if="store.trips.length === 0" class="text-sm opacity-70">
        Поки що немає жодного запису.
      </div>
      <div
        v-for="trip in store.trips"
        :key="trip.id"
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-base-200 p-4 rounded-lg"
      >
        <div>
          <div class="font-bold text-primary">{{ trip.title }}</div>
          <div class="text-xs opacity-75">{{ trip.location }} | {{ trip.date }}</div>
        </div>
        <div class="flex gap-2">
          <button @click="startEdit(trip)" class="btn btn-sm btn-outline btn-info">
            Редагувати
          </button>
          <button @click="store.deleteTrip(trip.id)" class="btn btn-sm btn-outline btn-error">
            Видалити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTravelerStore } from '../stores/travelerStore'
import type { Trip } from '../types'

const store = useTravelerStore()
const editingId = ref<string | null>(null)

const form = reactive({
  title: '',
  location: '',
  date: '',
  tagsInput: '',
  description: '',
  fullDescription: '',
  image: '',
  placesInput: ''
})

function startEdit(trip: Trip) {
  editingId.value = trip.id
  form.title = trip.title
  form.location = trip.location
  form.date = trip.date
  form.tagsInput = trip.tags.join(', ')
  form.description = trip.description
  form.fullDescription = trip.fullDescription
  form.image = trip.images[0] || ''
  form.placesInput = trip.places.join(', ')
}

function resetForm() {
  editingId.value = null
  form.title = ''
  form.location = ''
  form.date = ''
  form.tagsInput = ''
  form.description = ''
  form.fullDescription = ''
  form.image = ''
  form.placesInput = ''
}

function submitTrip() {
  const tripPayload = {
    title: form.title,
    location: form.location,
    date: form.date,
    description: form.description,
    fullDescription: form.fullDescription,
    tags: form.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    images: [form.image || 'https://picsum.photos/seed/default/600/400'],
    places: form.placesInput
      ? form.placesInput
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean)
      : [form.location]
  }

  if (editingId.value) {
    store.updateTrip({ id: editingId.value, ...tripPayload })
  } else {
    store.addTrip(tripPayload)
  }

  resetForm()
}
</script>