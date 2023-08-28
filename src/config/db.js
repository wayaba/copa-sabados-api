import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { UserModel } from '../models/users.js'
import { messages } from '../utils/messages.js'
import { EnvironmentVars } from './env.js'

export const connectToMongo = () => {
  mongoose.connect(EnvironmentVars.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const connection = mongoose.connection

  connection.on('error', (error) => {
    console.error(messages.error.connectionError, error)
  })

  connection.once('open', () => {
    console.log(messages.success.databaseConnected)
    initial()
  })
}

async function initial() {
  const count = await UserModel.estimatedDocumentCount({})

  if (count === 0) {
    try {
      const instance = new UserModel({
        username: EnvironmentVars.ADMIN_USERNAME,
        email: EnvironmentVars.ADMIN_EMAIL,
        password: bcrypt.hashSync(EnvironmentVars.ADMIN_PASSWORD, 8)
      })
      const savedInstance = await instance.save()
      console.log(messages.success.initialUserCreated, savedInstance)
    } catch (err) {
      console.error(err)
    }
  }
}
