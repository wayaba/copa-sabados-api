import { Schema, model } from 'mongoose'

const matchSchema = new Schema({
  date: Date,
  team1: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  team2: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
})

export const MatchModel = model('Match', matchSchema)
