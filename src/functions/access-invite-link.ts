import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

export async function AccesInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}