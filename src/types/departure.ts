export interface Departure {
  trip: number
  routeId: string
  headsign: string
  estimatedTime: string
  theoreticalTime: string
  delayInSeconds: number
}