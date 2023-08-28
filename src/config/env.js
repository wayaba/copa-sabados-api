import dotenv from 'dotenv'
dotenv.config()

export const EnvironmentVars = {
  PORT: process.env.PORT ?? 3344,
  MONGODB_URI: process.env.MONGODB_URI
}
