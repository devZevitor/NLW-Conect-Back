import Redis from "ioredis";
import { env } from "../types/env"

export const redis = new Redis(env.REDIS_URL)