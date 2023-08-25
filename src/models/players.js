import { Schema, model } from 'mongoose'

const playerSchema = new Schema({
  name: String,
  lastName: String,
  nickname: String
})

export const PlayerModel = model('Player', playerSchema)
