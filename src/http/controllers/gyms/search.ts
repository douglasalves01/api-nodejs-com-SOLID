import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSeachGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case.js'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query) // nenhum codigo vai continuar se essa validação falhar

  const searchGymsUseCase = makeSeachGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return reply.status(201).send(gyms)
}
