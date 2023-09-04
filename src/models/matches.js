import { Schema, model } from 'mongoose'

const matchSchema = new Schema({
  date: Date,
  tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  result: String,
  matchNumber: Number
})

export const MatchModel = model('Match', matchSchema)
