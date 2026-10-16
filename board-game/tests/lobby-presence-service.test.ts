import { expect, it } from 'vitest'
import { LobbyPresenceService } from '../server/services/lobbyPresenceService'
import { LobbyPresenceRepository } from '../server/repositories/lobbyPresenceRepository'

it('decrements the old province and increments the selected province once per player', () => {
  const service = new LobbyPresenceService(new LobbyPresenceRepository())
  service.update('a', 'Home')
  service.update('b', 'Other')
  service.update('a', 'Other')
  expect(service.countsByProvince()).toEqual({ Other: 2 })
  service.update('a', 'Other')
  expect(service.countsByProvince()).toEqual({ Other: 2 })
  service.remove('a')
  expect(service.countsByProvince()).toEqual({ Other: 1 })
})
