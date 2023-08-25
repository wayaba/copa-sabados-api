import { MatchModel } from '../models/matches.js'

export class MatchController {
  static async getAll(req, res) {
    const result = await MatchModel.find()
    return res.json(result)
  }
}
