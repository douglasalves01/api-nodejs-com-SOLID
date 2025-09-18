import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInUseCase } from '@/use-cases/factories/make-make-fetch-user-check-ins-history-use-case.js'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query) // nenhum codigo vai continuar se essa validação falhar

  const fetchUserCheckInsHistory = makeFetchUserCheckInUseCase()

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send(checkIns)
}
