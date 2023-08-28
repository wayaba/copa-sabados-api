import mongoose from 'mongoose'
import { EnvironmentVars } from './env.js'

const uri = EnvironmentVars.MONGODB_URI

export const connectToMongo = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const connection = mongoose.connection

  connection.on('error', (error) => {
    console.error('Database connection error:', error)
  })

  connection.once('open', () => {
    console.log('DB is connected')
    initial()
  })
}

function initial() {
  console.log('cosas iniciales')
}
