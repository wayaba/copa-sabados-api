import { Schema, model } from 'mongoose'

const tournamentSchema = new Schema({
  name: String,
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Match'
    }
  ]
})

export const TournamentModel = model('Tournament', tournamentSchema)
