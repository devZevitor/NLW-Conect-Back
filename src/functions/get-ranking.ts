import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscriberIdandScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i+=2){
    subscriberIdandScore[ranking[i]] = Number.parseInt(ranking[i+1])
  }

  const subscribers = await db
  .select()
  .from(subscriptions)
  .where(inArray(subscriptions.id, Object.keys(subscriberIdandScore)));

  const rankingWithScore = subscribers
  .map(subscribers => {
    return {
        id: subscribers.id,
        name: subscribers.name,
        score: subscriberIdandScore[subscribers.id]
    }
  })
  .sort((sub1, sub2) => {
    return sub2.score - sub1.score
  })

  return { rankingWithScore }
}
