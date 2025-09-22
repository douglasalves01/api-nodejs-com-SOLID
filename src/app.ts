import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes.js'
import { gymsRoutes } from './http/controllers/gyms/routes.js'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'
import { fastifyCookie } from '@fastify/cookie'
export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m', // 10 minutes
  },
})
app.register(fastifyCookie)
app.register(userRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issue: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    // traz os error no terminal -> EM PRODUCAO DESATIVAR
    console.error(error)
  } else {
    // todo: here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
