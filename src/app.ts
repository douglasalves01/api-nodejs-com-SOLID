import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import { ZodError } from 'zod'
import { env } from './env/index.js'
export const app = fastify()

app.register(appRoutes)

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
