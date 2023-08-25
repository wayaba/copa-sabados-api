import { Schema, model } from 'mongoose'

const teamSchema = new Schema({
  name: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ],
  result: {
    type: String,
    enum: ['W', 'T', 'L']
  }
})

export const TeamModel = model('Team', teamSchema)
