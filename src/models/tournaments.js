import { Schema, model } from 'mongoose'

const tournamentSchema = new Schema({
  name: {
    type: String,
    unique: true, // Marca el campo como único en la base de datos
    required: true
  },
  win: Number,
  draw: Number,
  lose: Number
})

export const TournamentModel = model('Tournament', tournamentSchema)
