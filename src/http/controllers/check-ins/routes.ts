import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { create } from './create.js'
import { validate } from './validate.js'
import { metrics } from './metrics.js'
import { history } from './history.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
