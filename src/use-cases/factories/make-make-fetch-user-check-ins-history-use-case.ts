import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-chekc-ins-history.js'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.js'

export function makeFetchUserCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  return useCase
}
