import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Trip, UserProfile } from '../types'

export const useTravelerStore = defineStore('traveler', () => {
  const token = ref<string | null>(sessionStorage.getItem('traveler_token'))
  const isAuthenticated = computed(() => Boolean(token.value))

  function login(nickname: string) {
    const newToken = 'mock_token_' + nickname
    sessionStorage.setItem('traveler_token', newToken)
    token.value = newToken
  }

  function logout() {
    sessionStorage.removeItem('traveler_token')
    token.value = null
  }

  const trips = ref<Trip[]>([
    tr(
      '1',
      'Європейський вікенд',
      'Прага, Чехія',
      '19.11.2026',
      'Незабутня подорож старовинними вулицями.',
      'Повна розповідь про Прагу, пивні традиції та архітектуру.',
      ['Європа', 'Місто'],
      ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyJGaxSwD2fcGh4h9Kn5TzeUysd-To2hK2ItmD7lAf8A&s=10'],
      ['Карлів міст', 'Празький град']
    ),
    tr(
      '2',
      'Гори Карпати',
      'Говерла, Україна',
      '19.11.2026',
      'Підкорення найвищої вершини.',
      'Сходження на Говерлу, ночівля в наметі, неймовірні краєвиди.',
      ['Гори', 'Україна'],
      ['https://upload.wikimedia.org/wikipedia/commons/b/ba/%D0%A0%D0%B0%D0%BD%D0%BE%D0%BA_%D0%BD%D0%B0_%D0%9A%D1%83%D0%BA%D1%83%D0%BB%D1%96.jpg?utm_source=uk.wikipedia.org&utm_campaign=index&utm_content=original'],
      ['Говерла', 'Озеро Несамовите']
    )
  ])

  function tr(
    id: string,
    title: string,
    location: string,
    date: string,
    description: string,
    fullDescription: string,
    tags: string[],
    images: string[],
    places: string[]
  ): Trip {
    return {
      id,
      title,
      location,
      date,
      description,
      fullDescription,
      tags,
      images,
      places
    }
  }

  const profile = ref<UserProfile>({
    name: 'Олежка мандрівник',
    avatar: 'https://i.pinimg.com/736x/8a/94/66/8a9466a0301ffd61248189794a43b36c.jpg',
    bio: 'Люблю помідори.'
  })

  function addTrip(newTrip: Omit<Trip, 'id'>) {
    const id = Date.now().toString()
    trips.value.unshift({ id, ...newTrip })
  }

  function updateTrip(updatedTrip: Trip) {
    const index = trips.value.findIndex((t) => t.id === updatedTrip.id)
    if (index !== -1) {
      trips.value[index] = updatedTrip
    }
  }

  function deleteTrip(id: string) {
    trips.value = trips.value.filter((t) => t.id !== id)
  }

  function updateProfile(updated: UserProfile) {
    profile.value = updated
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    trips,
    profile,
    addTrip,
    updateTrip,
    deleteTrip,
    updateProfile
  }
})