import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/models/user'

export const useAuth = defineStore('auth', () => {
  const user = ref<User>()

  return { user }
})
