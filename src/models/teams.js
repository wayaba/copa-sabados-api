import { Schema, model } from 'mongoose'

const teamSchema = new Schema({
  name: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
})

export const TeamModel = model('Team', teamSchema)
