import Dexie, { type Table } from 'dexie'

import type { User } from '../types/auth'

class StopScoutDB extends Dexie {
  users!: Table<User>

  constructor() {
    super('StopScoutDB')

    this.version(1).stores({
      users: '++id, username',
      favoriteStops: '++id, userId, stopId',
      cachedStops: '++id, stopId',
    })
  }
}

export const db = new StopScoutDB()