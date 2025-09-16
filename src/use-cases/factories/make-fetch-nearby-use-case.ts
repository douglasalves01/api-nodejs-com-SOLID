import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { FeatchNearbyGymsUseCase } from '../fetch-nearby-gyms.js'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FeatchNearbyGymsUseCase(gymsRepository)
  return useCase
}
