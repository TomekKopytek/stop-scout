import { describe, it, expect, beforeEach }
from 'vitest'

import { setActivePinia,
  createPinia }
from 'pinia'

import { useAuthStore }
from '../stores/authStore'

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('logs user in', () => {
    const store = useAuthStore()

    store.login(1, 'tomek')

    expect(store.user)
      .toBe('tomek')

    expect(store.userId)
      .toBe(1)
  })

  it('logs user out', () => {
    const store = useAuthStore()

    store.login(1, 'tomek')

    store.logout()

    expect(store.user)
      .toBe(null)

    expect(store.userId)
      .toBe(null)
  })
})