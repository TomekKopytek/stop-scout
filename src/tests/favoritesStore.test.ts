import 'fake-indexeddb/auto'
import {
  describe,
  it,
  expect,
  beforeEach
} from 'vitest'

import {
  setActivePinia,
  createPinia
} from 'pinia'

import { useFavoritesStore }
from '../stores/favorites'

describe('favoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds favorite', async () => {
    const store =
      useFavoritesStore()

    await store.addFavorite(
      1,
      100,
      'Test Stop',
      '01',
      ''
    )

    expect(
      store.favorites.length
    ).toBe(1)

    expect(
      store.favorites[0].stopName
    ).toBe('Test Stop')
  })

  it('removes favorite',
    async () => {

    const store =
      useFavoritesStore()

    await store.addFavorite(
      1,
      100,
      'Test Stop',
      '01',
      ''
    )

    await store.removeFavorite(
      100
    )

    expect(
      store.favorites.length
    ).toBe(0)
  })
})