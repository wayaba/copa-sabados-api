import { TournamentModel } from '../models/tournaments.js'

export class TournamentController {
  static async getAll(req, res) {
    const result = await TournamentModel.find()
    return res.json(result)
  }
}
