import cors from 'cors'
import { messages } from '../utils/messages.js'

const ACCEPTED_ORIGINS = [
  '/^http://localhost:3000/.*/',
  'http://localhost:3000',
  'http://localhost:3000/player',
  'http://mymovie.com',
  'http://localhost:3000/api/auth/signin'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) return callback(null, true)

      if (!origin) return callback(null, true)

      return callback(new Error(messages.error.notAllowByCors))
    }
  })
