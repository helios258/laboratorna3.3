import { ref, computed, type Ref } from 'vue'
import type { Trip } from '../types'

export type SortOrder = 'desc' | 'asc'

function parseTripDate(dateStr: string): number {
  const dotParts = dateStr.split('.')
  if (dotParts.length === 3) {
    const day = Number(dotParts[0])
    const month = Number(dotParts[1]) - 1
    const year = Number(dotParts[2])
    const timestamp = new Date(year, month, day).getTime()
    if (!Number.isNaN(timestamp)) {
      return timestamp
    }
  }

  const dashParts = dateStr.split('-')
  if (dashParts.length === 3) {
    const year = Number(dashParts[0])
    const month = Number(dashParts[1]) - 1
    const day = Number(dashParts[2])
    const timestamp = new Date(year, month, day).getTime()
    if (!Number.isNaN(timestamp)) {
      return timestamp
    }
  }

  const fallback = Date.parse(dateStr)
  return Number.isNaN(fallback) ? 0 : fallback
}

export function useTripFilter(trips: Ref<Trip[]>) {
  const searchTag = ref('')
  const sortOrder = ref<SortOrder>('desc')

  const filteredTrips = computed(() => {
    let list = [...trips.value]

    if (searchTag.value.trim()) {
      const query = searchTag.value.trim().toLowerCase()
      list = list.filter((t) => t.tags.some((tag) => tag.toLowerCase().includes(query)))
    }

    return list.sort((a, b) => {
      const dateA = parseTripDate(a.date)
      const dateB = parseTripDate(b.date)
      return sortOrder.value === 'desc' ? dateB - dateA : dateA - dateB
    })
  })

  return {
    searchTag,
    sortOrder,
    filteredTrips,
  }
}