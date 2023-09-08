import { Schema, model } from 'mongoose'

const playerSchema = new Schema({
  name: String,
  lastName: String,
  nickname: String
})

playerSchema.statics.getAll = async function () {
  return await PlayerModel.find()
}

export const PlayerModel = model('Player', playerSchema)
