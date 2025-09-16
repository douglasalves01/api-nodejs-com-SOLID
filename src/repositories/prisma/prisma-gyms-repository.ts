import type { Gym, Prisma } from 'generated/prisma/index.js'
import { prisma } from '@/lib/prisma.js'
import type { GymsRepository } from '../gyms-repository.js'

export class PrismaGymsRepository implements GymsRepository {
  async findManyNearby(latitude: number, longitude: number) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`
    return gyms
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })
    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gyms
  }
}
