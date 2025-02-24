import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/subscription',
    {
      schema: {
        summary: 'Subscribe someone to the event',
        tags: ['subscription'],
        description: 'Make the account fot the users of event NLW',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      return reply.status(201).send({ name, email })
    }
  )
}
