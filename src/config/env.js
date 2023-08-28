import dotenv from 'dotenv'
dotenv.config()

export const EnvironmentVars = {
  PORT: process.env.PORT ?? 3344,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET: process.env.SECRET ?? 'COPA-SABADOS-SECRET-KEY',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'admin',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@admin.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'copasabados'
}
