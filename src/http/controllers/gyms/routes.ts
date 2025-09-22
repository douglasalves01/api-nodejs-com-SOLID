import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { nearby } from './nearby.js'
import { search } from './search.js'
import { create } from './create.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', create)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
