import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { AccesInviteLink } from '../functions/access-invite-link'
import { env } from '../types/env'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await AccesInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)
      redirectUrl.searchParams.set('referral', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
