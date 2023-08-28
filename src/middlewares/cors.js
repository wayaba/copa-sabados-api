import cors from 'cors'
import { messages } from '../utils/messages'

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://mymovie.com']

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) return callback(null, true)

      if (!origin) return callback(null, true)

      return callback(new Error(messages.error.notAllowByCors))
    }
  })
