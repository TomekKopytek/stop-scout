import Dexie, { type Table } from 'dexie'

import type { User } from '../types/auth'
import type { Stop } from '../types/stop'

class StopScoutDB extends Dexie {
  users!: Table<User>

  cachedStops!: Table<Stop>

  cacheMetadata!: Table<{
    key: string
    timestamp: number
  }>

  constructor() {
    super('StopScoutDB')

    this.version(1).stores({
      users: '++id, username',

      favoriteStops: '++id, userId, stopId',

      cachedStops: '++id, stopId',

      cacheMetadata: 'key'
    })
  }
}

export const db = new StopScoutDB()