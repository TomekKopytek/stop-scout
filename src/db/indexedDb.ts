import Dexie from 'dexie'

export const db = new Dexie('StopScoutDB')

db.version(1).stores({
  users: '++id, username',
  favoriteStops: '++id, userId, stopId',
  cachedStops: '++id, stopId',
})