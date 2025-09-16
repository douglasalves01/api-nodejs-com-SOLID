import type { Gym } from 'generated/prisma/index.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface FeatchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FeatchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FeatchNearbyGymsUseCaseRequest): Promise<FeatchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby(
      userLatitude,
      userLongitude,
    )

    return {
      gyms,
    }
  }
}
