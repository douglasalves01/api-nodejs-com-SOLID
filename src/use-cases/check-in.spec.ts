import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from './check-in.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'

// Unit testing
let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Check-in User Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
