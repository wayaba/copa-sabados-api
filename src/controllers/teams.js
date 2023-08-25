import { TeamModel } from '../models/teams.js'

export class TeamController {
  static async getAll(req, res) {
    const result = await TeamModel.find()
    return res.json(result)
  }
}
