import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
})

export const UserModel = model('User', userSchema)
