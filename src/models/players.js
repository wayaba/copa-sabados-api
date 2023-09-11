import { Schema, model } from 'mongoose'

const playerSchema = new Schema({
  name: String,
  lastName: String,
  nickname: String
})

playerSchema.statics.getAll = async function () {
  return await PlayerModel.find()
}

playerSchema.statics.create = async function ({ input }) {
  const newPlayer = new PlayerModel({
    name: input.name,
    lastName: input.lastName,
    nickname: input.nickname
  })
  const savedPlayer = await newPlayer.save()
  return savedPlayer
}

playerSchema.statics.getById = async function (id) {
  return await PlayerModel.findById(id)
}

playerSchema.statics.update = async function (id, { input }) {
  const playerNewInfo = {
    name: input.name,
    lastName: input.lastName,
    nickname: input.nickname
  }
  const updatedPlayer = await PlayerModel.findOneAndUpdate(
    { _id: id },
    playerNewInfo,
    {
      new: true
    }
  )
  return updatedPlayer
}

playerSchema.statics.delete = async function ({ id }) {
  return await PlayerModel.deleteOne({ _id: id })
}

export const PlayerModel = model('Player', playerSchema)
