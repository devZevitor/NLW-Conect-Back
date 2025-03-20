import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { env } from './types/env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { getRankingRoute } from './routes/get-ranking-route'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors)

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW conect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(subscribeToEventRoute);
server.register(accessInviteLinkRoute);
server.register(getSubscriberInviteClicksRoute);
server.register(getSubscriberInvitesCountRoute);
server.register(getSubscriberRankingPositionRoute);
server.register(getRankingRoute)
server.listen({ port: env.PORT }).then(() => {
  console.log('Server is running!')
})
